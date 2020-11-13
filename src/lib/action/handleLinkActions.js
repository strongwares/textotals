import { upperCaseEachWordify } from './utils';
import {
  addAction,
  addCategoryItem,
  addLinkItem,
  createCategoryItemShell,
  createLinkItemShell,
  findAccountItem,
  findCategoryItem,
  findLinkItem,
  removeLinkItem,
} from './persistenceUtils';
import { findUser } from '../user/persistenceUtils';
import defaults from './defaults';
import handleAccountActions, {
  genAccountActionsInput,
} from './handleAccountActions';

function doSpendingCategorySync(syncObj, linkSelector) {
  var myCatItem = createCategoryItemShell(linkSelector);
  var lst = Object.getOwnPropertyNames(syncObj.spend);
  if (lst.length > 0) {
    lst.forEach(function (k, idx, array) {
      myCatItem.spend[k] = syncObj.spend[k];
    });
  }
  lst = Object.getOwnPropertyNames(syncObj.give);
  if (lst.length > 0) {
    lst.forEach(function (k, idx, array) {
      myCatItem.give[k] = syncObj.give[k];
    });
  }
  lst = Object.getOwnPropertyNames(syncObj.ccCategory);
  if (lst.length > 0) {
    lst.forEach(function (k, idx, array) {
      myCatItem.ccCategory[k] = syncObj.ccCategory[k];
    });
  }
  addCategoryItem(myCatItem);
}

function getTargetAccountBalances(userName, linkSelector) {
  console.log('getTargetAccountBalances, linkSelector: ');
  console.table(linkSelector);

  // if my fromAccount total is not 0, warn the user
  // else:
  //    check the target account (toAccount)
  //    if they have a link to me
  //    then use the target toAccount's balance to set my initial balances

  const mainAccount = upperCaseEachWordify(defaults.mainAccount);

  let myAccountItem = findAccountItem({
    userName,
    accountGroup: linkSelector.accountGroup,
  });

  const rval = {
    userName: '',
    account: {},
    spend: {},
    give: {},
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
      console.error(
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
    userName: targetUser.userName,
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
    // console.log(targetUser);
    // TOO
    // sendTotalsNotification('That account has not set up a link to you yet');
    return rval;
  }

  // Now get the link target user's account balance:
  const targetAccountItem = findAccountItem({
    userName: targetUser.userName,
    accountGroup: linkSelector.accountGroup,
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
      userName: targetUser.userName,
      accountGroup: linkSelector.accountGroup,
    });

    if (!theirSpendingCategoryItem) {
      console.error(
        "getTargetAccountBalances, failed to find target user account's spending category item"
      );
    } else {
      let lst = Object.getOwnPropertyNames(theirSpendingCategoryItem.spend);
      if (lst.length > 0) {
        lst.forEach(function (k, idx, array) {
          rval.spend[k] = theirSpendingCategoryItem.spend[k];
        });
      }
      lst = Object.getOwnPropertyNames(theirSpendingCategoryItem.give);
      if (lst.length > 0) {
        lst.forEach(function (k, idx, array) {
          rval.give[k] = theirSpendingCategoryItem.give[k];
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

function handleUnlinkAction(actionObj, userName) {
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
    userName,
    timestampMs: new Date().getTime(),
    actionStr: actionObj.actionStr,
    accountGroup: actionObj.accountGroup || defaults.accountGroup,
  };

  if (userName === actionObj.linkId) {
    console.error("handleUnlinkAction, error: you can't unlink your own name");
    throw new Error("You can't unlink your own name.");
  }
  console.log('tearDownTotalsAccountLink, linkId: ' + actionObj.linkId);

  // Use the group that was the prefix on the action string to override the
  // default value for group that was set on the action
  if (!!actionObj.accountGroup) {
    console.log('tearDownTotalsAccountLink, group: ' + actionObj.accountGroup);
    action.accountGroup = actionObj.accountGroup;
  }

  const linkSelector = {
    userName: action.userName,
    accountGroup: action.accountGroup,
    linkId: actionObj.linkId,
  };

  const linkItem = findLinkItem(linkSelector);
  if (!linkItem) {
    console.error(
      'tearDownTotalsAccountLink link to ' + actionObj.linkId + ' not found'
    );
    throw new Error('You do not have a link to that account');
  }

  removeLinkItem(linkItem.id);

  addAction(action);
}

function handleLinkAction(actionObj, userName) {
  const action = {
    userName,
    timestampMs: new Date().getTime(),
    actionStr: actionObj.actionStr,
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
    userName: action.userName,
    accountGroup: action.accountGroup,
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
  const rval = getTargetAccountBalances(userName, linkSelector);

  console.log('setUpTotalsAccountLink target account balances: ');
  console.table(rval);

  console.log('setUpTotalsAccountLink adding new link item');

  linkItem = createLinkItemShell(actionObj.linkId, fromAcct, toAcct, action);

  addLinkItem(linkItem);

  console.log('setUpTotalsAccountLink new link item:');
  console.log(linkItem);

  addAction(action);

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
