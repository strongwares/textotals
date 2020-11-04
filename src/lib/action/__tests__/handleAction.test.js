import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import handleAction from '../handleAction';
import persister from '../../../persistence/inMemory/InMemoryPersister';
import { initPersistence } from '../../../lib/persistenceUtils';
import {
  findAccountItem,
  findCategoryItem,
} from '../../../lib/action/persistenceUtils';
import { registerUser } from '../../../lib/user/persistenceUtils';
import { upperCaseEachWordify } from '../utils';
import defaults from '../defaults';

let utcdayjs;

beforeAll(() => {
  utcdayjs = dayjs.extend(utc);
  initPersistence(persister);
  registerUser({ userName: 'fred', email: 'f@f.com', password: '1' });
});

// Each test changes the given account's total, need to track it:
let defaultGroupMain = 0;
let defaultGroupSavings = 0;
let defaultGroupMySavings = 0;
let defaultGroupDefaultSpendCategory = 0;
let defaultGroupFoodCategory = 0;
let groupXMain = 0;
let groupXDefaultSpendCategory = 0;

describe('test action handler', function () {
  it('should handle set main 500', function () {
    const nameIn = 'fred';
    const opIn = 'set';
    const amountIn = 500;
    const actionObj = {
      actionStr: `${opIn} ${amountIn}`,
      op: opIn,
      amount: amountIn,
      isValid: true,
    };

    defaultGroupMain += amountIn;

    const action = handleAction(nameIn, actionObj);
    const { accountGroup, actionStr, amount, op, toAccount, userName } = action;

    const defaultGroup = upperCaseEachWordify(defaults.accountGroup);
    // when no account is specified on "set" action string, then default is main
    const defaultAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(toAccount).toBe(defaultAccount);
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `[ makes ${what}: ${defaultGroupMain.toFixed(2)} ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(defaultGroupMain);
  });

  it('should handle set savings 500', function () {
    const nameIn = 'fred';
    const opIn = 'set';
    const amountIn = 500;
    const toAccountIn = 'savings';
    const actionObj = {
      actionStr: `${opIn} ${amountIn} ${toAccountIn}`,
      op: opIn,
      amount: amountIn,
      toAccount: toAccountIn,
      isValid: true,
    };

    defaultGroupSavings += amountIn;

    const action = handleAction(nameIn, actionObj);
    const { accountGroup, actionStr, amount, op, toAccount, userName } = action;

    const defaultGroup = upperCaseEachWordify(defaults.accountGroup);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(toAccount).toBe(upperCaseEachWordify(toAccountIn));
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `[ makes ${what}: ${defaultGroupSavings.toFixed(2)} ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(defaultGroupSavings);
  });

  it('should handle add 100 to Main', function () {
    const nameIn = 'fred';
    const opIn = 'add';
    const amountIn = 100;
    const actionObj = {
      actionStr: `${opIn} ${amountIn}`,
      op: opIn,
      amount: amountIn,
      isValid: true,
    };

    defaultGroupMain += amountIn;

    const action = handleAction(nameIn, actionObj);
    const { accountGroup, actionStr, amount, op, toAccount, userName } = action;

    const defaultGroup = upperCaseEachWordify(defaults.accountGroup);
    const defaultToAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(toAccount).toBe(defaultToAccount);
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup
      ? `${accountGroup} ${defaultToAccount}`
      : defaultToAccount;
    const makesIt = `[ makes ${what}: ${defaultGroupMain.toFixed(2)} ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[toAccount].total).toBe(defaultGroupMain);
  });

  it('should handle add 100.5 to savings', function () {
    const nameIn = 'fred';
    const opIn = 'add';
    const amountIn = 100.5;
    const toAccountIn = 'savings';
    const actionObj = {
      actionStr: `${opIn} ${amountIn} to ${toAccountIn}`,
      op: opIn,
      amount: amountIn,
      toAccount: toAccountIn,
      isValid: true,
    };

    defaultGroupSavings += amountIn;

    const action = handleAction(nameIn, actionObj);
    const { accountGroup, actionStr, amount, op, toAccount, userName } = action;

    const defaultGroup = upperCaseEachWordify(defaults.accountGroup);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(toAccount).toBe(upperCaseEachWordify(toAccountIn));
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `[ makes ${what}: ${defaultGroupSavings.toFixed(2)} ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(defaultGroupSavings);
  });

  it('should handle add 100.99 to my savings', function () {
    const nameIn = 'fred';
    const opIn = 'add';
    const amountIn = 100.99;
    const toAccountIn = 'my savings';
    const actionObj = {
      actionStr: `${opIn} ${amountIn} to ${toAccountIn}`,
      op: opIn,
      amount: amountIn,
      toAccount: toAccountIn,
      isValid: true,
    };

    defaultGroupMySavings += amountIn;

    const action = handleAction(nameIn, actionObj);
    const { accountGroup, actionStr, amount, op, toAccount, userName } = action;

    const defaultGroup = upperCaseEachWordify(defaults.accountGroup);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(toAccount).toBe(upperCaseEachWordify(toAccountIn));
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `[ makes ${what}: ${defaultGroupMySavings.toFixed(2)} ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(defaultGroupMySavings);
  });

  it('should handle spend 50 from Main', function () {
    const nameIn = 'fred';
    const opIn = 'spend';
    const amountIn = 50;
    const actionObj = {
      actionStr: `${opIn} ${amountIn}`,
      op: opIn,
      amount: amountIn,
      isValid: true,
    };

    defaultGroupMain -= amountIn;

    defaultGroupDefaultSpendCategory += amountIn;

    const action = handleAction(nameIn, actionObj);
    const {
      accountGroup,
      actionStr,
      amount,
      category,
      op,
      fromAccount,
      userName,
    } = action;

    const defaultSpendCategory = upperCaseEachWordify(defaults.spendCategory);
    const defaultGroup = upperCaseEachWordify(defaults.accountGroup);
    const defaultFromAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(fromAccount).toBe(defaultFromAccount);
    expect(accountGroup).toBe(defaultGroup);
    expect(category).toBe(defaultSpendCategory);

    const what = !!accountGroup
      ? `${accountGroup} ${fromAccount}`
      : fromAccount;
    const makesIt = `[ makes ${what}: ${defaultGroupMain.toFixed(2)} ] `;
    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(defaultGroupMain);

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName,
      accountGroup,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[upperCaseEachWordify(category)].total).toBe(
      defaultGroupDefaultSpendCategory
    );
  });

  it('should handle spend 25 from Main on food', function () {
    const nameIn = 'fred';
    const opIn = 'spend';
    const amountIn = 25;
    const categoryIn = 'food';
    const actionObj = {
      actionStr: `${opIn} ${amountIn} on ${categoryIn}`,
      op: opIn,
      amount: amountIn,
      category: categoryIn,
      isValid: true,
    };

    defaultGroupMain -= amountIn;

    defaultGroupFoodCategory += amountIn;

    const action = handleAction(nameIn, actionObj);
    const {
      accountGroup,
      actionStr,
      amount,
      category,
      op,
      fromAccount,
      userName,
    } = action;

    const defaultGroup = upperCaseEachWordify(defaults.accountGroup);
    const defaultFromAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(fromAccount).toBe(defaultFromAccount);
    expect(accountGroup).toBe(defaultGroup);
    expect(category).toBe(upperCaseEachWordify(categoryIn));

    const what = !!accountGroup
      ? `${accountGroup} ${fromAccount}`
      : fromAccount;

    const makesIt = `[ makes ${what}: ${defaultGroupMain.toFixed(2)} ] `;
    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(defaultGroupMain);

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName,
      accountGroup,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[upperCaseEachWordify(category)].total).toBe(
      defaultGroupFoodCategory
    );
  });

  it('should handle move 100.09 to savings from Main', function () {
    const nameIn = 'fred';
    const opIn = 'move';
    const amountIn = 100.09;
    const toAccountIn = 'savings';
    const actionObj = {
      actionStr: `${opIn} ${amountIn} to ${toAccountIn}`,
      op: opIn,
      amount: amountIn,
      toAccount: toAccountIn,
      isValid: true,
    };

    defaultGroupMain -= amountIn;
    defaultGroupSavings += amountIn;

    const action = handleAction(nameIn, actionObj);
    const {
      accountGroup,
      actionStr,
      amount,
      op,
      fromAccount,
      toAccount,
      userName,
    } = action;

    const defaultGroup = upperCaseEachWordify(defaults.accountGroup);
    const defaultFromAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(fromAccount).toBe(defaultFromAccount);
    expect(toAccount).toBe(upperCaseEachWordify(toAccountIn));
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup ? `${accountGroup} ` : '';
    const makesIt = `[ makes ${what}${fromAccount}: ${defaultGroupMain.toFixed(
      2
    )}, ${toAccount}: ${defaultGroupSavings.toFixed(2)} ] `;
    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(defaultGroupMain);
    expect(accountItem[toAccount].total).toBe(defaultGroupSavings);
  });

  it('should handle set Group X main 500', function () {
    const nameIn = 'fred';
    const opIn = 'set';
    const amountIn = 500;
    const accountGroupIn = 'Group X';
    const actionObj = {
      actionStr: `${accountGroupIn} ${opIn} ${amountIn}`,
      op: opIn,
      accountGroup: accountGroupIn,
      amount: amountIn,
      isValid: true,
    };

    groupXMain += amountIn;

    const action = handleAction(nameIn, actionObj);
    const { accountGroup, actionStr, amount, op, toAccount, userName } = action;

    // when no account is specified on "set" action string, then default is main
    const defaultAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(toAccount).toBe(defaultAccount);
    expect(accountGroup).toBe(upperCaseEachWordify(accountGroupIn));

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `[ makes ${what}: ${groupXMain.toFixed(2)} ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(groupXMain);
  });

  it('should handle add 100 to GroupX Main', function () {
    const nameIn = 'fred';
    const opIn = 'add';
    const amountIn = 100;
    const accountGroupIn = 'Group X';
    const actionObj = {
      actionStr: `${accountGroupIn} ${opIn} ${amountIn}`,
      op: opIn,
      amount: amountIn,
      accountGroup: accountGroupIn,
      isValid: true,
    };

    groupXMain += amountIn;

    const action = handleAction(nameIn, actionObj);
    const { accountGroup, actionStr, amount, op, toAccount, userName } = action;

    const defaultToAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(toAccount).toBe(defaultToAccount);
    expect(accountGroup).toBe(accountGroupIn);

    const what = `${accountGroup} ${defaultToAccount}`;
    const makesIt = `[ makes ${what}: ${groupXMain.toFixed(2)} ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[toAccount].total).toBe(groupXMain);
  });

  it('should handle spend 50.55 from Group X Main', function () {
    const nameIn = 'fred';
    const opIn = 'spend';
    const amountIn = 50.55;
    const accountGroupIn = 'Group X';
    const actionObj = {
      actionStr: `${accountGroupIn} ${opIn} ${amountIn}`,
      op: opIn,
      accountGroup: accountGroupIn,
      amount: amountIn,
      isValid: true,
    };

    groupXMain -= amountIn;
    groupXDefaultSpendCategory += amountIn;

    const action = handleAction(nameIn, actionObj);
    const {
      accountGroup,
      actionStr,
      amount,
      category,
      op,
      fromAccount,
      userName,
    } = action;

    const defaultSpendCategory = upperCaseEachWordify(defaults.spendCategory);
    const defaultFromAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(accountGroup).toBe(accountGroupIn);
    expect(fromAccount).toBe(defaultFromAccount);
    expect(category).toBe(defaultSpendCategory);

    const what = `${accountGroup} ${defaultFromAccount}`;
    const makesIt = `[ makes ${what}: ${groupXMain.toFixed(2)} ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(groupXMain);

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName: nameIn,
      accountGroup: accountGroupIn,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[upperCaseEachWordify(category)].total).toBe(
      groupXDefaultSpendCategory
    );
  });
});
