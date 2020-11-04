import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { upperCaseEachWordify } from './utils';
import {
  addAction,
  addAccountItem,
  addCategoryItem,
  createAccountItemShell,
  createCategoryItemShell,
  findAccountItem,
  findCategoryItem,
  findLinkItem,
  findLinkItems,
  findUser,
  updateAccountItem,
  updateCategoryItem,
} from './persistenceUtils';
import defaults from './defaults';

const utcdayjs = dayjs.extend(utc);

// May be called recursively updateLinkedAccount
// When called from there the link target user name
// will be passed as the userName
function handleAccountActions(inputObj) {
  const {
    actionObj,
    userName,
    curLinkSrc,
    origLinkSrc,
    postHandlingPrefix,
  } = inputObj;

  const { actionStr, amount, op } = actionObj;

  if (!op || !amount || !actionStr) {
    console.error('handleAccountActions: invalid actionObj');
    console.table(actionObj);
    throw new Error(
      'handleAccountActions: unable to handle action, invalid object'
    );
  }

  const accountGroup = upperCaseEachWordify(
    actionObj.accountGroup || defaults.accountGroup
  );

  // This is one of the objects that will be persisted:
  const action = {
    userName,
    accountGroup,
    timestampMs: new Date().getTime(),
    actionStr,
    amount,
    op,
  };

  // Get the account data that we're going to update:
  let query = { accountGroup, userName };
  let accountItem = findAccountItem(query);
  if (!accountItem) {
    accountItem = addAccountItem(createAccountItemShell(query));
  }

  let makesIt;
  let total;

  let category = '';
  let toAccount = defaults.toAccount;
  let fromAccount = defaults.fromAccount;

  const updateObj = { ...query };

  if (action.op === 'add') {
    fromAccount = '';

    toAccount = upperCaseEachWordify(
      actionObj.toAccount || defaults.mainAccount
    );

    if (accountItem.hasOwnProperty(toAccount)) {
      total = accountItem[toAccount].total + amount;
    } else {
      total = amount;
    }

    updateObj.account = toAccount;
    updateObj.total = total;
    updateAccountItem(updateObj);

    makesIt = ' [ makes ';

    if (!!accountGroup) {
      makesIt += `${accountGroup} `;
    }

    makesIt += `${toAccount}: ${total.toFixed(2)} ] `;

    /*
    console.log(
      'add ' + amount + ' to account ' + toAccount + ', new total ' + total
    );
    */

    action.toAccount = toAccount;
  } else if (action.op === 'spend') {
    toAccount = '';

    fromAccount = upperCaseEachWordify(
      actionObj.fromAccount || defaults.mainAccount
    );

    if (accountItem.hasOwnProperty(fromAccount)) {
      total = accountItem[fromAccount].total - amount;
    } else {
      total = 0 - amount;
    }

    updateObj.account = fromAccount;
    updateObj.total = total;
    updateAccountItem(updateObj);

    makesIt = ' [ makes ';

    if (!!accountGroup) {
      makesIt += `${accountGroup} `;
    }

    makesIt += `${fromAccount}: ${total.toFixed(2)} ] `;

    /*
    console.log(
      'spend ' +
        amount +
        ' from account ' +
        fromAccount +
        ', new total ' +
        total
    );
    */

    // Get the category data that we're going to update:
    const theTime = utcdayjs.utc();
    const catQuery = {
      ...query,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    };
    let categoryItem = findCategoryItem(catQuery);
    if (!categoryItem) {
      categoryItem = addCategoryItem(createCategoryItemShell(catQuery));
    }

    category = upperCaseEachWordify(
      actionObj.category || defaults.spendCategory
    );

    if (categoryItem.spend.hasOwnProperty(category)) {
      total = categoryItem.spend[category].total + amount;
    } else {
      total = amount;
    }

    const categoryUpdateObj = { ...catQuery };
    categoryUpdateObj.spendCategory = category;
    categoryUpdateObj.total = total;
    updateCategoryItem(categoryUpdateObj);

    /*
    console.log(
      'spend ' + amount + ' on category ' + category + ', new total ' + total
    );
    */

    action.fromAccount = fromAccount;
    action.category = category;
  } else if (action.op === 'move') {
    fromAccount = upperCaseEachWordify(
      actionObj.fromAccount || defaults.mainAccount
    );

    // Handle fromAccount
    if (accountItem.hasOwnProperty(fromAccount)) {
      total = accountItem[fromAccount].total - amount;
    } else {
      total = 0 - amount;
    }

    updateObj.account = fromAccount;
    updateObj.total = total;
    updateAccountItem(updateObj);

    makesIt = ' [ makes ';
    if (!!accountGroup) {
      makesIt += `${accountGroup} `;
    }

    makesIt += `${fromAccount}: ${total.toFixed(2)}`;

    /*
    console.log(
      'move ' + amount + ' from account ' + fromAccount + ', new total ' + total
    );
    */

    // Handle toAccount
    toAccount = upperCaseEachWordify(
      actionObj.toAccount || defaults.mainAccount
    );

    if (accountItem.hasOwnProperty(toAccount)) {
      total = accountItem[toAccount].total + amount;
    } else {
      total = amount;
    }

    updateObj.account = toAccount;
    updateObj.total = total;
    updateAccountItem(updateObj);

    makesIt += ', ';

    if (!!accountGroup) {
      makesIt += `${accountGroup} `;
    }
    makesIt += `${toAccount}: ${total.toFixed(2)} ] `;

    /*
    console.log(
      'move ' + amount + ' to account ' + toAccount + ', new total ' + total
    );
    */

    action.fromAccount = fromAccount;
    action.toAccount = toAccount;
  } else if (action.op === 'give') {
    // Handle fromAccount
    fromAccount = upperCaseEachWordify(
      actionObj.fromAccount || defaults.mainAccount
    );

    if (accountItem.hasOwnProperty(fromAccount)) {
      total = accountItem[fromAccount].total - amount;
    } else {
      total = 0 - amount;
    }

    updateObj.account = fromAccount;
    updateObj.total = total;
    updateAccountItem(updateObj);

    makesIt = ' [ makes ';

    if (!!accountGroup) {
      makesIt += `${accountGroup} `;
    }
    makesIt += `${fromAccount}: ${total.toFixed(2)} ]`;

    /*
    console.log(
      'give ' + amount + ' from account ' + fromAccount + ', new total ' + total
    );
    */

    // Handle the give to category that we're going to update:
    const theTime = utcdayjs.utc();
    const catQuery = {
      ...query,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    };
    let categoryItem = findCategoryItem(catQuery);
    if (!categoryItem) {
      categoryItem = addCategoryItem(createCategoryItemShell(catQuery));
    }

    // The give to category was parsed into toAccount,
    // its not one of my own account names.
    category = upperCaseEachWordify(
      actionObj.toAccount || defaults.giveAccount
    );

    if (categoryItem.give.hasOwnProperty(category)) {
      total = categoryItem.give[category].total + amount;
    } else {
      total = amount;
    }

    const categoryUpdateObj = { ...catQuery };
    categoryUpdateObj.giveCategory = category;
    categoryUpdateObj.total = total;
    updateCategoryItem(categoryUpdateObj);

    // console.log('give ' + amount + ' to ' + category + ', new total ' + total);

    action.fromAccount = fromAccount;
    action.category = category;
  } else if (action.op === 'set') {
    fromAccount = '';

    toAccount = upperCaseEachWordify(
      actionObj.toAccount || defaults.mainAccount
    );

    total = amount;

    makesIt = ' [ makes ';
    if (!!accountGroup) {
      makesIt += `${accountGroup} `;
    }
    makesIt += `${toAccount}: ${total.toFixed(2)} ] `;

    /*
    console.log(
      'set ' + amount + ' on account ' + toAccount + ', new value ' + total
    );
    */

    updateObj.account = toAccount;
    updateObj.total = total;
    updateAccountItem(updateObj);

    action.toAccount = toAccount;
  } else if (action.op === 'adjust') {
    fromAccount = '';

    toAccount = upperCaseEachWordify(
      actionObj.toAccount || defaults.mainAccount
    );

    // Handle toAccount
    if (accountItem.hasOwnProperty(toAccount)) {
      total = accountItem[toAccount].total + amount;
    } else {
      total = amount;
    }

    updateObj.account = toAccount;
    updateObj.total = total;
    updateAccountItem(updateObj);

    makesIt = ' [ makes ';

    if (!!accountGroup) {
      makesIt += `${accountGroup} `;
    }
    makesIt += `${toAccount}: ${total.toFixed(2)} ] `;

    /*
    console.log(
      'adjust ' + amount + ' on account ' + toAccount + ', new total ' + total
    );
    */

    action.toAccount = toAccount;
  } else {
    console.error(action.actionStr + ' not supported');
    throw new Error(`Unsupported action: ${action.actionStr}`);
  }

  updateLinkedAccount(
    action,
    actionObj,
    userName,
    accountGroup,
    op,
    amount,
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

  /*
  console.log(
    'handleAccountActions: after doing account action, now inserting:'
  );
  console.log(action);
  */

  addAction(action);

  // Support testing:
  return action;
}

function updateLinkedAccount(
  action,
  actionObj,
  userName,
  accountGroup,
  op,
  amount,
  category,
  fromAcct,
  toAcct,
  curLinkSrc,
  origLinkSrc
) {
  /*
  console.log(
    'updateLinkedAccount, userName: ' +
      userName +
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
  */

  // First find all the out link configs I have that match the current action's accounts.
  // If it is joint, then the link config will be all all
  // If it is 2-way, then link config will match to and from accounts
  // And need to skip any link confs that match the curLinkSrc or origLinkSrc,
  // meaning that I don't want to send a link action to the account that was the
  // original source of the action.
  var outLinks = findLinkItems({
    userName,
    accountGroup,
    fromAccount: ['all', fromAcct, toAcct],
  });

  if (!outLinks) {
    // console.log('handleTotalsOutLinking, no out links');
    return;
  }

  // Visit each account that I have an outgoing link to:
  outLinks.forEach(function (linkConf) {
    const { linkId } = linkConf;
    console.log(
      `doOneTotalsOutLink, userName: ${userName}, linkConf linkId: ${linkId}, linkConf:`
    );
    console.table(linkConf);

    if (linkId === origLinkSrc) {
      console.log(
        'doOneTotalsOutLink, skipping send-to linkId, it was the origLinkSrc: ' +
          origLinkSrc
      );
      return;
    }
    if (linkId === curLinkSrc) {
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
    let targetUser = findUser({ userName: linkId });

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

    // The userName that is executing this action may not be the same as the current
    // app user since we are recursively calling doActionInsert with the userName of
    // the link target. So we look for link configs whose linkId is the userName of the
    // userName executing the action:
    let targetLinkConf = findLinkItem({
      userName: targetUser.userName,
      accountGroup,
      linkId: userName,
      $or: [
        { toAccount: { $eq: 'all' } },
        { toAccount: { $eq: fromAcct } },
        { toAccount: { $eq: toAcct } },
      ],
    });

    if (!targetLinkConf) {
      console.error(
        'doOneTotalsOutLink: target link item not found, action userName: ' +
          userName +
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
        userName,
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
        userName,
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
      targetLinkConf.userN,
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
  userName,
  curLinkSrc,
  origLinkSrc,
  postHandlingPrefix = ''
) {
  return {
    actionObj,
    userName,
    curLinkSrc,
    origLinkSrc,
    postHandlingPrefix,
  };
}

export { genAccountActionsInput };
export default handleAccountActions;
