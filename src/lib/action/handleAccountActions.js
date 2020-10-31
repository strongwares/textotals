import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { upperCaseEachWordify } from './utils';
import {
  createAccountItemShell,
  createCategoryItemShell,
  insertAction,
  findAccountItem,
  findCategoryItem,
  findLinkItem,
  findLinkItems,
  findUser,
  insertAccountItem,
  insertCategoryItem,
  updateAccountItem,
  updateCategoryItem,
} from './persistenceUtils';
import defaults from './defaults';

const utcdayjs = dayjs.extend(utc);

// May be called recursively updateLinkedAccount
// When called from there the link target userId
// and userName will be passed.
function handleAccountActions(inputObj) {
  const {
    actionObj,
    userId,
    userName,
    curLinkSrc,
    origLinkSrc,
    postHandlingPrefix,
  } = inputObj;

  if (
    !actionObj ||
    !actionObj.op ||
    !actionObj.amount ||
    !actionObj.actionStr
  ) {
    console.error('handleAccountActions: invalid actionObj');
    console.table(actionObj);
    throw new Error(
      'handleAccountActions: unable to handle action, invalid object'
    );
  }

  // This is one of the objects that will be persisted:
  const action = {
    userId,
    timestampMs: new Date().getTime(),
    actionStr: actionObj.actionStr,
    amount: actionObj.amount,
    op: actionObj.op,
    appBrand: actionObj.appBrand || defaults.appBrand,
    appName: actionObj.appName || defaults.appName,
    accountGroup: actionObj.accountGroup || defaults.accountGroup,
    acct: '',
  };

  let origAmount = action.amount;
  let amount = 100 * origAmount;

  // Get the account data that we're going to update:
  let accountItem = findAccountItem({
    appName: action.appName,
    accountGroup: action.accountGroup,
    userId,
  });
  let accountItemId = null;
  if (!accountItem) {
    accountItem = createAccountItemShell(action);
    accountItemId = insertAccountItem(accountItem);
  } else {
    accountItemId = accountItem.id;
  }

  const theTime = utcdayjs.utc();

  let categoryItem = findCategoryItem({
    appName: action.appName,
    accountGroup: action.accountGroup,
    userId: action.userId,
    year: theTime.format('YYYY'),
    month: theTime.format('MMM'),
  });

  let categoryItemId = null;
  if (action.op === 'spend' || action.op === 'give') {
    if (!categoryItem) {
      categoryItem = createCategoryItemShell(action, theTime);
      categoryItemId = insertCategoryItem(categoryItem);
    } else {
      categoryItemId = categoryItem.id;
    }
  }

  let makesIt;
  let num;
  let acctKey;
  let acctDateKey;
  let newTotal;

  let toAccount = upperCaseEachWordify(defaults.toAccount);
  let mainAccount = upperCaseEachWordify(defaults.mainAccount);
  let defaultCategory = upperCaseEachWordify(defaults.spendCategory);

  let fromAccount = mainAccount;
  let defaultToAccount = toAccount;
  let category = '';

  const updateObj = { updateDate: new Date().getTime() };
  const categoryUpdateObj = {};

  if (action.op === 'add') {
    fromAccount = '';

    toAccount = actionObj.toAccount || mainAccount;

    acctKey = `account.${toAccount}`;
    acctDateKey = `accountDate.${toAccount}`;

    if (accountItem.account.hasOwnProperty(toAccount)) {
      newTotal = accountItem.account[toAccount] + amount;
    } else {
      newTotal = amount;
    }

    updateObj[acctKey] = newTotal;
    updateObj[acctDateKey] = new Date().getTime();

    num = newTotal / 100;
    makesIt = ' [ makes ';

    if (!!actionObj.group) {
      makesIt += `${actionObj.group} `;
    }

    makesIt += `${toAccount}: ${num.toFixed(2)} ] `;

    console.log(
      'add ' +
        amount +
        ' to account ' +
        toAccount +
        ', new total ' +
        num.toFixed(2)
    );

    console.log('add action account update object:');
    console.log(updateObj);

    action.acct = toAccount;

    updateAccountItem(accountItemId, updateObj);
  } else if (action.op === 'spend') {
    let catKey;

    toAccount = '';

    fromAccount = actionObj.fromAccount || mainAccount;
    category = actionObj.category || defaultCategory;

    if (accountItem.account.hasOwnProperty(fromAccount)) {
      newTotal = accountItem.account[fromAccount] - amount;
    } else {
      newTotal = 0 - amount;
    }

    acctKey = `account.${fromAccount}`;
    acctDateKey = `accountDate.${fromAccount}`;

    updateObj[acctKey] = newTotal;
    updateObj[acctDateKey] = new Date().getTime();

    num = newTotal / 100;
    makesIt = ' [ makes ';

    if (!!actionObj.group) {
      makesIt += `${actionObj.group}  `;
    }

    makesIt += `${fromAccount}: ${num.toFixed(2)} ] `;

    console.log(
      'spend ' +
        amount +
        ' from account ' +
        fromAccount +
        ', new total ' +
        num.toFixed(2)
    );

    categoryUpdateObj.updateDate = new Date().getTime();

    catKey = `spendCategory.${category}`;

    if (categoryItem.spendCategory.hasOwnProperty(category)) {
      newTotal = categoryItem.spendCategory[category] + amount;
    } else {
      newTotal = amount;
    }

    categoryUpdateObj[catKey] = newTotal;

    console.log(
      'spend ' + amount + ' on category ' + category + ', new total ' + newTotal
    );

    console.log('spend action account update object:');
    console.log(updateObj);

    updateAccountItem(accountItemId, { $set: updateObj });

    console.log('spend action totals category update object:');
    console.log(categoryUpdateObj);

    action.acct = fromAccount;
    action.cat = category;

    updateCategoryItem(categoryItemId, { $set: categoryUpdateObj });
  } else if (action.op === 'move') {
    toAccount = actionObj.toAccount || defaultToAccount;
    fromAccount = actionObj.fromAccount || mainAccount;

    // Handle fromAccount
    acctKey = `account.${fromAccount}`;
    acctDateKey = `accountDate.${fromAccount}`;

    if (accountItem.account.hasOwnProperty(fromAccount)) {
      newTotal = accountItem.account[fromAccount] - amount;
    } else {
      newTotal = 0 - amount;
    }

    updateObj[acctKey] = newTotal;
    updateObj[acctDateKey] = new Date().getTime();

    num = newTotal / 100;

    makesIt = ' [ makes ';
    if (!!actionObj.group) {
      makesIt += `${actionObj.group} `;
    }

    makesIt += `${fromAccount}: ${num.toFixed(2)}`;

    console.log(
      'move ' +
        amount +
        ' from account ' +
        fromAccount +
        ', new total ' +
        num.toFixed(2)
    );

    // Handle toAccount
    acctKey = `account.${toAccount}`;
    acctDateKey = `accountDate.${toAccount}`;

    if (accountItem.account.hasOwnProperty(toAccount)) {
      newTotal = accountItem.account[toAccount] + amount;
    } else {
      newTotal = amount;
    }

    updateObj[acctKey] = newTotal;
    updateObj[acctDateKey] = new Date().getTime();

    num = newTotal / 100;

    makesIt += ', ';

    if (!!actionObj.group) {
      makesIt += `${actionObj.group} `;
    }
    makesIt += `${toAccount}: ${num.toFixed(2)} ] `;

    console.log(
      'move ' +
        amount +
        ' to account ' +
        toAccount +
        ', new total ' +
        num.toFixed(2)
    );
    console.log('move action account update object:');
    console.log(updateObj);

    action.acct = fromAccount;
    action.acct2 = toAccount;

    updateAccountItem(accountItemId, { $set: updateObj });
  } else if (action.op === 'give') {
    toAccount = actionObj.toAccount || defaults.giveAccount;

    fromAccount = actionObj.fromAccount || mainAccount;

    // Handle fromAccount
    if (accountItem.account.hasOwnProperty(fromAccount)) {
      newTotal = accountItem.account[fromAccount] - amount;
    } else {
      newTotal = 0 - amount;
    }

    acctKey = `account.${fromAccount}`;
    acctDateKey = `accountDate.${fromAccount}`;

    updateObj[acctKey] = newTotal;
    updateObj[acctDateKey] = new Date().getTime();

    num = newTotal / 100;

    makesIt = ' [ makes ';

    if (!!actionObj.group) {
      makesIt += `${actionObj.group} `;
    }
    makesIt += `${fromAccount}: ${num.toFixed(2)} ]`;

    console.log(
      'give ' +
        amount +
        ' from account ' +
        fromAccount +
        ', new total ' +
        num.toFixed(2)
    );

    // Handle toAccount
    if (categoryItem.giveAccount.hasOwnProperty(toAccount)) {
      newTotal = categoryItem.giveAccount[toAccount] + amount;
    } else {
      newTotal = amount;
    }

    acctKey = `giveAccount.${toAccount}`;
    categoryUpdateObj[acctKey] = newTotal;

    categoryUpdateObj.updateDate = new Date().getTime();

    num = newTotal / 100;

    console.log(
      'give ' +
        amount +
        ' to account ' +
        toAccount +
        ', new total ' +
        num.toFixed(2)
    );

    console.log('give action account update object:');
    console.log(updateObj);

    console.log('give action totals category update object:');
    console.log(categoryUpdateObj);

    action.acct = fromAccount;
    action.cat = toAccount;

    updateAccountItem(accountItemId, { $set: updateObj });
    updateCategoryItem(categoryItemId, { $set: categoryUpdateObj });
  } else if (action.op === 'set') {
    fromAccount = '';

    toAccount = actionObj.toAccount || mainAccount;

    newTotal = amount;
    num = newTotal / 100;

    makesIt = ' [ makes ';
    if (!!actionObj.group) {
      makesIt += `${actionObj.group} `;
    }
    makesIt += `${toAccount} ${num.toFixed(2)} ] `;

    console.log(
      'set ' +
        amount +
        ' on account ' +
        toAccount +
        ', new value ' +
        num.toFixed(2)
    );

    acctKey = `account.${toAccount}`;
    acctDateKey = `accountDate.${toAccount}`;

    updateObj[acctKey] = newTotal;
    updateObj[acctDateKey] = new Date().getTime();

    action.acct = toAccount;

    updateAccountItem(accountItemId, { $set: updateObj });
  } else if (action.op === 'adjust') {
    fromAccount = '';

    toAccount = actionObj.toAccount || mainAccount;

    // Handle toAccount
    if (accountItem.account.hasOwnProperty(toAccount)) {
      newTotal = accountItem.account[toAccount] + amount;
    } else {
      newTotal = amount;
    }

    acctKey = `account.${toAccount}`;
    acctDateKey = `accountDate.${toAccount}`;

    updateObj[acctKey] = newTotal;
    updateObj[acctDateKey] = new Date().getTime();

    num = newTotal / 100;

    makesIt = ' [ makes ';

    if (!!actionObj.group) {
      makesIt += `${actionObj.group} `;
    }
    makesIt += `${toAccount}: ${num.toFixed(2)} ] `;

    console.log(
      'adjust ' +
        amount +
        ' on account ' +
        toAccount +
        ', new total ' +
        num.toFixed(2)
    );

    action.acct = toAccount;

    updateAccountItem(accountItemId, { $set: updateObj });
  } else {
    console.error(action.actionStr + ' not supported');
    throw new Error(`Unsupported action: ${action.actionStr}`);
  }

  updateLinkedAccount(
    action,
    actionObj,
    userName,
    actionObj.accountGroup,
    action.op,
    origAmount,
    category,
    fromAccount,
    toAccount,
    curLinkSrc,
    origLinkSrc
  );

  if (!!postHandlingPrefix) {
    action.actionStr = postHandlingPrefix + action.actionStr;
  }

  action.actionStr += makesIt;

  console.log(
    'handleAccountActions: after doing account action, now inserting:'
  );
  console.log(action);

  insertAction(action);

  // Support testing:
  return action;
}

function updateLinkedAccount(
  action,
  actionObj,
  actionUserName,
  accountGroup,
  op,
  amount,
  category,
  fromAcct,
  toAcct,
  curLinkSrc,
  origLinkSrc
) {
  console.log(
    'updateLinkedAccount, actionUserName: ' +
      actionUserName +
      ', accountGroup: ' +
      accountGroup +
      ', op: ' +
      op +
      ', amount: ' +
      amount +
      ', category: ' +
      category +
      ', fromAccount: ' +
      fromAcct +
      ', toAccount: ' +
      toAcct,
    ', curLinkSrc: ' + curLinkSrc + ', origLinkSrc: ' + origLinkSrc
  );

  // First find all the out link configs I have that match the current action's accounts.
  // If it is joint, then the link config will be all all
  // If it is 2-way, then link config will match to and from accounts
  // And need to skip any link confs that match the curLinkSrc or origLinkSrc,
  // meaning that I don't want to send a link action to the account that was the
  // original source of the action.
  var outLinks = findLinkItems(
    {
      userId: action.userId,
      appName: action.appName,
      accountGroup: action.accountGroup,
      $or: [
        { fromAccount: { $eq: 'all' } },
        { fromAccount: { $eq: fromAcct } },
        { fromAccount: { $eq: toAcct } },
      ],
    },
    {
      reactive: false,
    }
  );

  if (!outLinks) {
    console.log('handleTotalsOutLinking, no out links');
    return;
  }

  // Visit each account that I have an outgoing link to:
  outLinks.forEach(function (linkConf) {
    /*
         console.log("doOneTotalsOutLink, actionUserName: " + actionUserName + 
                ", group: " + group +
                ", op: " + op +
                ", amount: " + amount + ", category: " + category +
                ", fromAccount: " + fromAcct +
                ", toAccount: " + toAcct + ", linkConf:");
         console.log(linkConf);
         */

    console.log('doOneTotalsOutLink, linkId: ' + linkConf.linkId);

    if (linkConf.linkId === origLinkSrc) {
      console.log(
        'doOneTotalsOutLink, skipping send-to linkId, it was the origLinkSrc: ' +
          origLinkSrc
      );
      return;
    }
    if (linkConf.linkId === curLinkSrc) {
      console.log(
        'doOneTotalsOutLink, skipping send-to linkId, it was the curLinkSrc: ' +
          curLinkSrc
      );
      return;
    }

    /*
         var targetUser = getUserObject(
         {
        "profile.mobilephone": linkConf.linkId
      },
      {
        reactive: false
      } );
         */

    /*
         var targetUser = getUserObject(
         {
         emails: { $elemMatch: { address: myLinkSelector.linkId }}
         },
         {
         reactive: false
         } );
         */
    let targetUser = findUser({ userName: linkConf.linkId });

    if (!targetUser) {
      console.log(
        'doOneTotalsOutLink: target user not found for linkId: ' +
          linkConf.linkId
      );
      // let user know?
      // or silently fail?
      return;
    }

    //console.log("doOneTotalsOutLink, targetUser: ");
    //console.log(targetUser);

    // Find the target account's link configs
    // If that account has a link in config whose linkId is the username of the userId executing the action,
    // i.e. the source account username,
    // only then we can add this action to their account

    /*
         console.log("doOneTotalsOutLink, calling getTotalsLinkItem: targetUserId: " + targetUser._id +
                ", name: " + action.name +
                ", group: " + group +
                ", actionUserName: " + actionUserName +
                ", fromAcct: " + fromAcct +
                ", toAcct: " + toAcct);
         */

    // The value of the "group" variable is the group prefix that was set on the original action message.
    // The value of the action.group is either that group prefix from the original message or the default group setting.
    // Keeping both values allows flexibility in what is passed in the downstream link sequence

    // The userId and username that is executing this action may not be the same as the current
    // Meteor user since we are recursively calling doActionInsert with the userId of
    // the link target. So we look for link configs whose linkId is the username of the
    // userId executing the action:
    let targetLinkConf = findLinkItem({
      userId: targetUser.id,
      appName: action.appName,
      accountGroup: action.accountGroup,
      linkId: actionUserName,
      $or: [
        { toAccount: { $eq: 'all' } },
        { toAccount: { $eq: fromAcct } },
        { toAccount: { $eq: toAcct } },
      ],
    });

    if (!targetLinkConf) {
      console.error(
        'doOneTotalsOutLink: target link item not found, actionUserName: ' +
          actionUserName +
          ', linkId: ' +
          linkConf.linkId +
          ', target user: '
      );
      console.log(targetUser);
      // let user know?
      // or silently fail?
      return;
    }

    //console.log("doOneTotalsOutLink, targetLinkConf: ");
    //console.log(targetLinkConf);

    // The source is the original initiating action's username, to prevent a recursive loop from
    // adjusting the original action account's balance

    // Fully joint accounts if all on both sides
    if (
      linkConf.fromAccount === 'all' &&
      linkConf.toAccount === 'all' &&
      targetLinkConf.fromAccount === 'all' &&
      targetLinkConf.toAccount === 'all'
    ) {
      // The handling of joint linking uses the original action message  in its entirety
      doOneOutJointLink(
        linkConf,
        targetLinkConf,
        action,
        actionObj,
        fromAcct,
        toAcct,
        actionUserName,
        origLinkSrc
      );
    }
    // Outbound 2-way sync of accounts if source fromAccount == target toAccount
    else if (linkConf.fromAccount === targetLinkConf.toAccount) {
      // The handling of partial 2way linking creates a new action string so we want to pass the group prefix from the original action message
      // which may be empty, that allows the link user action to not have a group prefix if the original user action did not include one
      doOneOut2WayLink(
        linkConf,
        targetLinkConf,
        action,
        accountGroup,
        op,
        amount,
        category,
        fromAcct,
        toAcct,
        actionUserName,
        origLinkSrc
      );
    } else {
      console.log(
        'doOneTotalsOutLink, matching remote link configuration not found!'
      );
    }
  });
}

function doOneOutJointLink(
  srcLinkConf,
  targetLinkConf,
  action,
  actionObj,
  fromAccount,
  toAccount,
  curLinkSrc,
  origLinkSrc
) {
  console.log(
    'doOneTotalsOutJointLink, executing joint linked action on target user ' +
      targetLinkConf.userId +
      ', target linkId: ' +
      srcLinkConf.linkId +
      ', curLinkSrc: ' +
      curLinkSrc +
      ', origLinkSrc: ' +
      origLinkSrc
  );

  // Process same action string for the target user
  // Pass the current action user's link config linkId, that will be the new action's username:
  handleAccountActions(
    genAccountActionsInput(
      actionObj,
      targetLinkConf.userId,
      srcLinkConf.linkId,
      curLinkSrc,
      origLinkSrc,
      '[ ' + srcLinkConf.linkId + ' ] '
    )
  );
}

function doOneOut2WayLink(
  srcLinkConf,
  targetLinkConf,
  action,
  accountGroup,
  op,
  amount,
  category,
  fromAccount,
  toAccount,
  curLinkSrc,
  origLinkSrc
) {
  const mainAccount = upperCaseEachWordify(defaults.mainAccount);
  // var mainAccount = getSetting('preference-totalsMainAccount');
  var newActionStr;
  var actionObj = {};

  console.log(
    'doOneTotalsOut2WayLink, executing 2-way linked action on target user ' +
      targetLinkConf.userId +
      ', linkId: ' +
      srcLinkConf.linkId +
      ', source action: ' +
      action.actionStr +
      ', accountGroup: ' +
      accountGroup +
      ', op: ' +
      op +
      ', amount: ' +
      amount +
      ', category: ' +
      category +
      ', source fromAccount: ' +
      fromAccount +
      ', source toAccount: ' +
      toAccount +
      ', curLinkSrc: ' +
      curLinkSrc +
      ', origLinkSrc: ' +
      origLinkSrc
  );

  // Construct and process a new action string, passing actions that adjust the target account's totals, not
  // passing details of spending categories or giving accounts

  if (op === 'set' || op === 'add' || op === 'adjust') {
    newActionStr = op + ' ' + amount;
  } else if (op === 'move') {
    // The link config target account could be either the fromAccount or the toAccount
    // in the original source's action string
    if (toAccount === srcLinkConf.fromAccount) {
      newActionStr = 'add ' + amount;
    } else {
      newActionStr = 'adjust -' + amount;
    }
  } else if (op === 'spend') {
    newActionStr = 'adjust -' + amount;
  } else if (op === 'give') {
    newActionStr = 'adjust -' + amount;
  } else {
    console.log('doOneTotalsOut2WayLink, unrecognized operation: ' + op);
    return;
  }

  if (srcLinkConf.toAccount !== mainAccount) {
    newActionStr += ' ' + srcLinkConf.toAccount;
  }

  // Only add the group explicitly if it was provided in the original action message:
  if (!!accountGroup) {
    newActionStr = accountGroup + ' ' + newActionStr;
  }

  // Pass the current action user's link config linkId, that will be the new action's username:
  actionObj.actionStr = newActionStr;
  actionObj.amount = amount;
  actionObj.op = op;
  actionObj.accountGroup = accountGroup;
  actionObj.fromAccount = fromAccount;
  actionObj.toAccount = toAccount;
  actionObj.category = category;

  handleAccountActions(
    genAccountActionsInput(
      actionObj,
      targetLinkConf.userId,
      srcLinkConf.linkId,
      curLinkSrc,
      origLinkSrc,
      '[ ' + srcLinkConf.linkId + ' ] '
    )
  );
}

// Convenience function so a single props object
// is passed in instead of lots of individual
// args
function genAccountActionsInput(
  actionObj,
  userId,
  userName,
  curLinkSrc,
  origLinkSrc,
  postHandlingPrefix = ''
) {
  return {
    actionObj,
    userId,
    userName,
    curLinkSrc,
    origLinkSrc,
    postHandlingPrefix,
  };
}

export { genAccountActionsInput };
export default handleAccountActions;
