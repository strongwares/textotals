import { upperCaseEachWordify } from './utils';
import {
  createCategoryItemShell,
  createLinkItemShell,
  insertAction,
  findAccountItem,
  findCategoryItem,
  findLinkItem,
  findUser,
  insertCategoryItem,
  insertLinkItem,
  removeLinkItem,
} from './persistenceUtils';
import defaults from './defaults';
import handleAccountActions, {
  genAccountActionsInput,
} from './handleAccountActions';

function doSpendingCategorySync(syncObj, linkSelector) {
  var myCatItem = createCategoryItemShell(linkSelector);
  var lst = Object.getOwnPropertyNames(syncObj.spendCategory);
  if (lst.length > 0) {
    lst.forEach(function (k, idx, array) {
      myCatItem.spendCategory[k] = syncObj.spendCategory[k];
    });
  }
  lst = Object.getOwnPropertyNames(syncObj.giveAccount);
  if (lst.length > 0) {
    lst.forEach(function (k, idx, array) {
      myCatItem.giveAccount[k] = syncObj.giveAccount[k];
    });
  }
  lst = Object.getOwnPropertyNames(syncObj.ccCategory);
  if (lst.length > 0) {
    lst.forEach(function (k, idx, array) {
      myCatItem.ccCategory[k] = syncObj.ccCategory[k];
    });
  }
  insertCategoryItem(myCatItem);
}

function getTargetAccountBalances(userName, userId, linkSelector) {
  console.log('getTargetAccountBalances, linkSelector: ');
  console.table(linkSelector);

  // if my fromAccount total is not 0, warn the user
  // else:
  //    check the target account (toAccount)
  //    if they have a link to me
  //    then use the target toAccount's balance to set my initial balances

  const mainAccount = upperCaseEachWordify(defaults.mainAccount);

  let myAccountItem = findAccountItem({
    appName: linkSelector.appName,
    accountGroup: linkSelector.accountGroup,
    userId,
  });

  const rval = {
    userName: '',
    account: {},
    spendCategory: {},
    giveAccount: {},
  };

  let myBalance = 0;
  let fromAccount;
  if (!!myAccountItem) {
    if (
      linkSelector.fromAccount === 'Main' ||
      linkSelector.fromAccount === 'all'
    ) {
      fromAccount = mainAccount;
    } else if (myAccountItem.account.hasOwnProperty(linkSelector.fromAccount)) {
      fromAccount = linkSelector.fromAccount;
    } else {
      console.log(
        'getTargetAccountBalances, from account not found: ' + fromAccount
      );
      //throw new Meteor.Error(500, "You have no account named " + fromAccount);
    }
    if (!!myAccountItem.account[fromAccount]) {
      myBalance = myAccountItem.account[fromAccount] / 100;
    }

    if (myBalance > 0) {
      console.log(
        'getTargetAccountBalances, fromAccount "' +
          fromAccount +
          '" is non-zero: ' +
          myBalance
      );
    }
  }

  const targetUser = findUser({ userName: linkSelector.linkId });
  if (!targetUser) {
    console.log(
      `getTargetAccountBalances, target user not found for linkId: ${linkSelector.linkId}`
    );

    // TODO
    /*
    sendTotalsNotification(
      'An account with that user name has not been created yet'
    );
    */
    return rval;
  }

  rval.userName = targetUser.userName;

  const targetLinkConfToMe = findLinkItem({
    userId: targetUser.id,
    appName: linkSelector.appName,
    accountGroup: linkSelector.accountGroup,
    linkId: userName,
    $or: [
      { toAccount: { $eq: 'all' } },
      { toAccount: { $eq: linkSelector.fromAccount } },
    ],
  });

  if (!targetLinkConfToMe) {
    console.log(
      'getTargetAccountBalances, target link item not found' +
        ', target linkId: ' +
        linkSelector.linkId +
        ', target user: '
    );
    console.log(targetUser);
    // TOO
    // sendTotalsNotification('That account has not set up a link to you yet');
    return rval;
  }

  // Now get the link target user's account balance:
  const targetAccountItem = findAccountItem({
    appName: linkSelector.appName,
    accountGroup: linkSelector.accountGroup,
    userId: targetUser.id,
  });

  if (!targetAccountItem) {
    console.log(
      "getTargetAccountBalances, target user's account item not found" +
        ', target linkId: ' +
        linkSelector.linkId +
        ', target user: '
    );
    console.error(
      'getTargetAccountBalances: an account with that user name has not been created yet, user was:'
    );
    console.table(targetUser);
    // TODO
    // sendTotalsNotification('an account with that user name has not been created yet');
    return rval;
  }

  // toAccount is the target user account
  let theirBalance = 0;
  let toAccount;
  if (linkSelector.toAccount === 'Main' || linkSelector.toAccount === 'all') {
    toAccount = mainAccount;
  } else if (targetAccountItem.account.hasOwnProperty(linkSelector.toAccount)) {
    toAccount = linkSelector.toAccount;
  } else {
    console.log(
      "getTargetAccountBalances, target user's to account (" +
        linkSelector.toAccount +
        ') not found: ' +
        toAccount
    );
    // TODO
    //throw new Error("You have no account named " + fromAccount);
  }

  if (!!toAccount && !!targetAccountItem.account[toAccount]) {
    theirBalance = targetAccountItem.account[toAccount] / 100;
    console.log(
      'getTargetAccountBalances, targetUser\'s toAccount "' +
        toAccount +
        '" balance is ' +
        theirBalance
    );
  }

  if (myBalance > 0 && myBalance !== theirBalance) {
    console.error(
      'getTargetAccountBalances, myBalance (' +
        myBalance +
        ') != theirBalance (' +
        theirBalance +
        ') '
    );
    // TODO
    /*
    sendTotalsNotification(
      'Your previous balance in that account (' +
        myBalance +
        ') was different then their balance (' +
        theirBalance +
        ')'
    );
    */
  }

  // For full joint account linking ("all"), need to get all account balances
  if (linkSelector.toAccount === 'all') {
    const accts = Object.getOwnPropertyNames(targetAccountItem.account);
    if (accts.length > 0) {
      accts.forEach(function (k, idx, array) {
        const num = targetAccountItem.account[k] / 100;
        rval.account[k] = num.toFixed(2);
      });
    }

    // Now setup sync for spending categories:
    const theirSpendingCategoryItem = findCategoryItem({
      appName: linkSelector.appName,
      accountGroup: linkSelector.accountGroup,
      userId: targetUser.id,
    });

    if (!theirSpendingCategoryItem) {
      console.error(
        "getTargetAccountBalances, failed to find target user account's spending category item"
      );
    } else {
      let lst = Object.getOwnPropertyNames(
        theirSpendingCategoryItem.spendCategory
      );
      if (lst.length > 0) {
        lst.forEach(function (k, idx, array) {
          rval.spendCategory[k] = theirSpendingCategoryItem.spendCategory[k];
        });
      }
      lst = Object.getOwnPropertyNames(theirSpendingCategoryItem.giveAccount);
      if (lst.length > 0) {
        lst.forEach(function (k, idx, array) {
          rval.giveAccount[k] = theirSpendingCategoryItem.giveAccount[k];
        });
      }
    }
  }
  // link fromMe toThem <username>
  else if (linkSelector.toAccount === 'Main') {
    if (!!targetAccountItem.account[mainAccount]) {
      const num = targetAccountItem.account[mainAccount] / 100;
      rval.account[fromAccount] = num.toFixed(2);
      console.log(
        'getTargetAccountBalances toAccount is main, from account is ' +
          fromAccount +
          ', rval.account[' +
          fromAccount +
          '] = ' +
          rval.account[fromAccount]
      );
    }
  }
  // link fromMe toThem <username>
  else if (linkSelector.fromAccount === 'Main') {
    if (!!targetAccountItem.account[toAccount]) {
      const num = targetAccountItem.account[toAccount] / 100;
      rval.account[mainAccount] = num.toFixed(2);
      console.log(
        'getTargetAccountBalances fromAccount is main, to account is ' +
          toAccount +
          ', rval.account[' +
          mainAccount +
          '] = ' +
          rval.account[mainAccount]
      );
    }
  } else {
    if (!!targetAccountItem.account[toAccount]) {
      rval.account[fromAccount] = targetAccountItem.account[toAccount];
      console.log(
        'getTargetAccountBalances not main, fromAccount is ' +
          fromAccount +
          ', to account is ' +
          toAccount +
          ', rval.account[' +
          fromAccount +
          ']= ' +
          rval.account[toAccount]
      );
    }
  }
  return rval;
}

function handleUnlinkAction(actionObj, userId, userName) {
  console.log('tearDownTotalsAccountLink actionObj:');
  console.dir(actionObj);

  // unlink link <username>
  //var linkId = _normalizePhoneNum(actionObj.linkId);
  //var linkId = actionObj.linkId;

  // Can't unlink yourself:
  /*
  var ownPhone = _normalizePhoneNum(Meteor.user().profile.mobilephone);
  if (!!ownPhone && ownPhone == phone) {
    console.log("tearDownTotalsAccountLink, error: you can't link to own phone number");
    throw new Meteor.Error(500, "You can't unlink your own phone number.");
  }
  console.log("tearDownTotalsAccountLink, linkId: " + phone);
  */
  /*
  var ownEmail = Meteor.user().emails[0].address;
  if (!!ownEmail && ownEmail == actionObj.linkId) {
    console.log("tearDownTotalsAccountLink, error: you can't unlink your own email");
    throw new Meteor.Error(500, "You can't unlink your own email.");
  }
  */
  const action = {
    userId,
    timestampMs: new Date().getTime(),
    actionStr: actionObj.actionStr,
    appBrand: actionObj.appBrand || defaults.appBrand,
    appName: actionObj.appName || defaults.appName,
    accountGroup: actionObj.accountGroup || defaults.accountGroup,
  };

  if (userName === actionObj.linkId) {
    console.error("handleUnlinkAction, error: you can't unlink your own name");
    throw new Error("You can't unlink your own name.");
  }
  console.log('tearDownTotalsAccountLink, linkId: ' + actionObj.linkId);

  // Use the group that was the prefix on the action string to override the
  // default value for group that was set on the action
  if (!!actionObj.appGroup) {
    console.log('tearDownTotalsAccountLink, group: ' + actionObj.appGroup);
    action.appGroup = actionObj.appGroup;
  }

  const linkSelector = {
    appName: action.appName,
    appGroup: action.appGroup,
    userId: action.userId,
    linkId: actionObj.linkId,
  };

  const linkItem = findLinkItem(linkSelector, { reactive: false });
  if (!linkItem) {
    console.error(
      'tearDownTotalsAccountLink link to ' + actionObj.linkId + ' not found'
    );
    throw new Error('You do not have a link to that account');
  }

  removeLinkItem(linkItem.id);

  insertAction(action);
}

function handleLinkAction(actionObj, userId, userName) {
  const action = {
    userId,
    timestampMs: new Date().getTime(),
    actionStr: actionObj.actionStr,
    appBrand: actionObj.appBrand || defaults.appBrand,
    appName: actionObj.appName || defaults.appName,
    accountGroup: actionObj.accountGroup || defaults.accountGroup,
  };

  console.log('setUpTotalsAccountLink action:');
  console.log(action);

  // link <what> <who>
  // 1) joint:
  // link <username>
  // 2) 2-way sync of one account only, only operations that adjust the target account total:
  // link <srcacct> <targetacct> <username>
  if (userName === actionObj.linkId) {
    console.error("setUpTotalsAccountLink, error: you can't link to own name");
    throw new Error("You can't link to yourself.");
  }

  let fromAcct = 'all';
  let toAcct = 'all';
  let matchArray;

  // 1) joint:
  // link <username>
  // var re1 = /link\s+(\(?[2-9]{1}\d{2}\)?[-|\s]?[2-9]{1}\d{2}[-|\s]?\d{4})$/;
  // const re1 = /link\s+(\w+)$/;

  // 2) 2-way sync of one account only
  // link <fromMyAcct> <toTheirAcct> <username>
  //var re2 = /link\s+(\w+)\s+(\w+)\s+(\(?[2-9]{1}\d{2}\)?[-|\s]?[2-9]{1}\d{2}[-|\s]?\d{4})$/;
  const re2 = /link\s+(\w+)\s+(\w+)\s+(\w+)$/;

  // link <username>
  if (re2.test(action.actionStr)) {
    console.log('setUpTotalsAccountLink, link action matches 2way');
    matchArray = re2.exec(action.actionStr);
    // we already have target username
    // get fromAccount and toAccount
    fromAcct = matchArray[1];
    toAcct = matchArray[2];

    fromAcct = upperCaseEachWordify(fromAcct);
    toAcct = upperCaseEachWordify(toAcct);
  } else {
    console.log('setUpTotalsAccountLink, link action matches joint');
    // matchArray = re1.exec(action.actionStr);
    // stay with defaults:
    // we already have target username
    // we'll stick with fromAccount: all and toAccount:all
  }

  console.log(
    'setUpTotalsAccountLink, linkId: ' +
      actionObj.linkId +
      ', fromAccount: ' +
      fromAcct +
      ', toAccount: ' +
      toAcct
  );

  // Use the group that was the prefix on the action string to override the
  // default value for group that was set on the action
  if (!!actionObj.accountGroup) {
    console.log('tearDownTotalsAccountLink, group: ' + actionObj.accountGroup);
    action.accountGroup = actionObj.accountGroup;
  }

  const linkSelector = {
    appName: action.appName,
    accountGroup: action.accountGroup,
    userId: action.userId,
    linkId: actionObj.linkId,
    fromAccount: fromAcct,
    toAccount: toAcct,
  };

  let linkItem = findLinkItem(linkSelector);
  if (!!linkItem) {
    console.error(
      'setUpTotalsAccountLink link item already existed to ' +
        actionObj.linkId +
        ', action: '
    );
    console.table(action);
    throw new Error('You already have a link to that account');
  }

  // Before creating link, need to establish initial sync between two user's accounts:
  // Need to copy all accounts and spending categories from target account,
  // not just the main balance
  const rval = getTargetAccountBalances(userName, userId, linkSelector);

  console.log('setUpTotalsAccountLink target account balances: ');
  console.table(rval);

  console.log('setUpTotalsAccountLink adding new link item');

  linkItem = createLinkItemShell(actionObj.linkId, fromAcct, toAcct, action);

  insertLinkItem(linkItem);

  console.log('setUpTotalsAccountLink new link item:');
  console.log(linkItem);

  insertAction(action);

  const syncAccts = Object.getOwnPropertyNames(rval.account);
  if (syncAccts.length > 0) {
    console.log(
      'setUpTotalsAccountLink, link created, setting initial linked balances'
    );

    // Target account balances will be set if our initial balance is 0 and the target linked account(s)
    // are > 0 and we need to set our initial balance to match the link target accounts'
    // current balance(s).
    // Passing the target linkId to mimic that this set action was done
    // by the target link user so that this set action won't be sent back to them.
    syncAccts.forEach(function (k, idx, array) {
      const amount = rval.account[k];
      console.log(
        'setUpTotalsAccountLink, sync account: ' +
          k +
          ', balance: ' +
          rval.account[k]
      );

      if (amount > 0) {
        let msg = 'set ' + rval.account[k] + ' ' + k;
        if (!!actionObj.accountGroup) {
          msg = actionObj.accountGroup + ' ' + msg;
        }

        // From original:
        //  _doActionInsert(msg,Meteor.userId(), ownName, actionObj.linkId, actionObj.linkId, "[ " + rval.username + " ] ");

        // actionObj is the result of parseAction:
        /*
        {
          actionStr,
          op,
          accountGroup,
          amount
          category,
          fromAccount,
          toAccount,
          linkId, // for op link
          fromAccount, // for op link
          toAccount, // for op link
        }
        */
        handleAccountActions(
          genAccountActionsInput(
            {
              actionStr: msg,
              op: 'set',
              amount,
              accountGroup: actionObj.accountGroup || '',
              category: '',
            },
            userId,
            userName,
            actionObj.linkId,
            actionObj.linkId,
            '[ ' + rval.userName + ' ] '
          )
        );
      }
    });

    // For full joint linking, need to also sync the spending categories
    if (fromAcct === 'all') {
      console.log(
        'setUpTotalsAccountLink, link created, joint link, syncing spending categories'
      );
      doSpendingCategorySync(rval, linkSelector);
    }
  }
}

export { handleLinkAction, handleUnlinkAction };
