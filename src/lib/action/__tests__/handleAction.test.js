import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import handleAction from '../handleAction';
import persister from '../../../persistence/inMemory/InMemoryPersister';
import { initPersistence } from '../../../lib/persistenceUtils';
import {
  findAccountItem,
  findCategoryItem,
  getAccountGroups,
  getCategories,
  getLastActions,
} from '../../../lib/action/persistenceUtils';
import { registerUser } from '../../../lib/user/persistenceUtils';
import { upperCaseEachWordify } from '../utils';
import defaults from '../defaults';

const TOTALS_SEP = '::';
const ACCOUNT_SEP = ':;:';

let utcdayjs;
let theTime;
let year;
let month;

beforeAll(() => {
  utcdayjs = dayjs.extend(utc);
  theTime = utcdayjs.utc();
  year = theTime.format('YYYY');
  month = theTime.format('MMM');
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

const defaultGroup = defaults.accountGroup;

// Todo:
// scroll action list to bottom on load

// d caci spend 10 from aib => pulls from main unless a category

// d spend 10 from savings  => pulls from main unless a category
// spend 10 on gas from savings: works
// d problem is spendCatRe matches first

// d problem: set main 500 passes but is not valid

// dana
// don't upper case anything if is all caps

// dana
// add an "undo" op to undo last
// add a "send" op to send to main without linking being required

// x Add the account table linking like in orig:
// see the budget_account_item.html

// d Finish the Totals tab which is the original "Budget Spending Page"
// d see the budget_spending_item.html (categories totals in a list)

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

    // when no account is specified on "set" action string, then default is main
    const defaultAccount = defaults.mainAccount;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(toAccount).toBe(defaultAccount);
    expect(accountGroup).toBe(defaultGroup);

    const what = `${accountGroup} ${toAccount}`;
    const makesIt = `${TOTALS_SEP}${what}: ${defaultGroupMain.toFixed(2)}`;

    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(defaultGroupMain * 100);

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][toAccount].total).toBe(
      defaultGroupMain * 100
    );

    const categories = getCategories({
      month,
      year,
      userName,
    });
    expect(categories[accountGroup]).toBe(undefined);
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

    const defaultGroup = defaults.accountGroup;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(toAccount).toBe(toAccountIn);
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `${TOTALS_SEP}${what}: ${defaultGroupSavings.toFixed(2)}`;

    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(
      defaultGroupSavings * 100
    );

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][toAccount].total).toBe(
      defaultGroupSavings * 100
    );
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

    const defaultGroup = defaults.accountGroup;
    const defaultToAccount = defaults.mainAccount;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(toAccount).toBe(defaultToAccount);
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup
      ? `${accountGroup} ${defaultToAccount}`
      : defaultToAccount;
    const makesIt = `${TOTALS_SEP}${what}: ${defaultGroupMain.toFixed(2)}`;

    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[toAccount].total).toBe(defaultGroupMain * 100);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][toAccount].total).toBe(
      defaultGroupMain * 100
    );
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

    const defaultGroup = defaults.accountGroup;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(toAccount).toBe(toAccountIn);
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `${TOTALS_SEP}${what}: ${defaultGroupSavings.toFixed(2)}`;

    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(
      defaultGroupSavings * 100
    );

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][toAccount].total).toBe(
      defaultGroupSavings * 100
    );
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

    const defaultGroup = defaults.accountGroup;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(toAccount).toBe(toAccountIn);
    expect(accountGroup).toBe(defaultGroup);

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `${TOTALS_SEP}${what}: ${defaultGroupMySavings.toFixed(2)}`;

    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(
      defaultGroupMySavings * 100
    );

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][toAccount].total).toBe(
      defaultGroupMySavings * 100
    );
  });

  it('should handle spend 50', function () {
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

    const defaultSpendCategory = defaults.spendCategory;
    const defaultGroup = defaults.accountGroup;
    const defaultFromAccount = defaults.mainAccount;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(fromAccount).toBe(defaultFromAccount);
    expect(accountGroup).toBe(defaultGroup);
    expect(category).toBe(defaultSpendCategory);

    const what = !!accountGroup
      ? `${accountGroup} ${fromAccount}`
      : fromAccount;
    const makesIt = `${TOTALS_SEP}${what}: ${defaultGroupMain.toFixed(2)}`;
    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(defaultGroupMain * 100);

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName,
      accountGroup,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[category].total).toBe(defaultGroupDefaultSpendCategory * 100);

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][fromAccount].total).toBe(
      defaultGroupMain * 100
    );

    const categories = getCategories({
      month,
      year,
      userName,
    });

    expect(categories[accountGroup].spend[category].total).toBe(
      defaultGroupDefaultSpendCategory * 100
    );
  });

  it('should handle spend 10.50 from savings', function () {
    const nameIn = 'fred';
    const opIn = 'spend';
    const amountIn = 10.5;
    const fromAccountIn = 'savings';
    const actionObj = {
      actionStr: `${opIn} ${amountIn} from ${fromAccountIn}`,
      op: opIn,
      amount: amountIn,
      fromAccount: fromAccountIn,
      isValid: true,
    };

    defaultGroupSavings -= amountIn;

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

    const defaultSpendCategory = defaults.spendCategory;
    const defaultGroup = defaults.accountGroup;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(fromAccount).toBe(fromAccountIn);
    expect(accountGroup).toBe(defaultGroup);
    expect(category).toBe(defaultSpendCategory);

    const what = !!accountGroup
      ? `${accountGroup} ${fromAccount}`
      : fromAccount;
    const makesIt = `${TOTALS_SEP}${what}: ${defaultGroupSavings.toFixed(2)}`;
    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(defaultGroupSavings * 100);

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName,
      accountGroup,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[category].total).toBe(defaultGroupDefaultSpendCategory * 100);

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][fromAccount].total).toBe(
      defaultGroupSavings * 100
    );

    const categories = getCategories({
      month,
      year,
      userName,
    });

    expect(categories[accountGroup].spend[category].total).toBe(
      defaultGroupDefaultSpendCategory * 100
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

    const defaultGroup = defaults.accountGroup;
    const defaultFromAccount = defaults.mainAccount;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(fromAccount).toBe(defaultFromAccount);
    expect(accountGroup).toBe(defaultGroup);
    expect(category).toBe(categoryIn);

    const what = !!accountGroup
      ? `${accountGroup} ${fromAccount}`
      : fromAccount;

    const makesIt = `${TOTALS_SEP}${what}: ${defaultGroupMain.toFixed(2)}`;
    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(defaultGroupMain * 100);

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName,
      accountGroup,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[category].total).toBe(defaultGroupFoodCategory * 100);

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][fromAccount].total).toBe(
      defaultGroupMain * 100
    );

    const categories = getCategories({
      month,
      year,
      userName,
    });
    // console.dir(categories[accountGroup][0]);
    expect(categories[accountGroup].spend[category].total).toBe(
      defaultGroupFoodCategory * 100
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

    const defaultGroup = defaults.accountGroup;
    const defaultFromAccount = defaults.mainAccount;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(fromAccount).toBe(defaultFromAccount);
    expect(toAccount).toBe(toAccountIn);
    expect(accountGroup).toBe(defaultGroup);

    const makesIt = `${TOTALS_SEP}${accountGroup} ${fromAccount}: ${defaultGroupMain.toFixed(
      2
    )}${ACCOUNT_SEP}${accountGroup} ${toAccount}: ${defaultGroupSavings.toFixed(
      2
    )}`;
    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(defaultGroupMain * 100);
    expect(accountItem[toAccount].total).toBe(defaultGroupSavings * 100);

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][toAccount].total).toBe(
      defaultGroupSavings * 100
    );
    expect(accountGroups[accountGroup][fromAccount].total).toBe(
      defaultGroupMain * 100
    );
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
    const defaultAccount = defaults.mainAccount;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(toAccount).toBe(defaultAccount);
    expect(accountGroup).toBe(accountGroupIn);

    const what = !!accountGroup ? `${accountGroup} ${toAccount}` : toAccount;
    const makesIt = `${TOTALS_SEP}${what}: ${groupXMain.toFixed(2)}`;

    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const persistedAccountItem = findAccountItem({ accountGroup, userName });
    expect(persistedAccountItem[toAccount].total).toBe(groupXMain * 100);

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][toAccount].total).toBe(groupXMain * 100);
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

    const defaultToAccount = defaults.mainAccount;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(toAccount).toBe(defaultToAccount);
    expect(accountGroup).toBe(accountGroupIn);

    const what = `${accountGroup} ${defaultToAccount}`;
    const makesIt = `${TOTALS_SEP}${what}: ${groupXMain.toFixed(2)}`;

    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[toAccount].total).toBe(groupXMain * 100);

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][toAccount].total).toBe(groupXMain * 100);
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

    const defaultSpendCategory = defaults.spendCategory;
    const defaultFromAccount = defaults.mainAccount;

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn * 100);
    expect(accountGroup).toBe(accountGroupIn);
    expect(fromAccount).toBe(defaultFromAccount);
    expect(category).toBe(defaultSpendCategory);

    const what = `${accountGroup} ${defaultFromAccount}`;
    const makesIt = `${TOTALS_SEP}${what}: ${groupXMain.toFixed(2)}`;

    expect(actionStr).toBe(`${actionObj.actionStr}${makesIt}`);

    const accountItem = findAccountItem({ accountGroup, userName });
    expect(accountItem[fromAccount].total).toBe(+(groupXMain * 100).toFixed(0));

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName: nameIn,
      accountGroup: accountGroupIn,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[category].total).toBe(groupXDefaultSpendCategory * 100);

    const lastActions = getLastActions({
      accountGroup,
      numActions: 1,
      month,
      year,
      userName,
    });
    expect(lastActions[0].actionStr).toBe(actionStr);

    const accountGroups = getAccountGroups({ userName });
    expect(accountGroups[accountGroup][fromAccount].total).toBe(
      +(groupXMain * 100).toFixed(0)
    );

    const categories = getCategories({
      month,
      year,
      userName,
    });

    // console.dir(categories[accountGroup][0]);

    expect(categories[accountGroup].spend[category].total).toBe(
      groupXDefaultSpendCategory * 100
    );
  });
});
