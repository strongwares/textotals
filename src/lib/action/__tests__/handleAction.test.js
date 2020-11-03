import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import handleAction from '../handleAction';
import persister from '../../../persistence/inMemory/InMemoryPersister';
import { initPersistence } from '../../../lib/persistenceUtils';
import { findCategoryItem } from '../../../lib/action/persistenceUtils';
import { registerUser } from '../../../lib/user/persistenceUtils';
import { upperCaseEachWordify } from '../utils';
import defaults from '../defaults';

let utcdayjs;

beforeAll(() => {
  utcdayjs = dayjs.extend(utc);
  initPersistence(persister);
  registerUser({ userName: 'fred', email: 'f@f.com', password: '1' });
});

describe('test action handler', function () {
  it('should handle add to Main', function () {
    const nameIn = 'fred';
    const opIn = 'add';
    const amountIn = 100;
    const actionObj = {
      actionStr: `${opIn} ${amountIn}`,
      op: opIn,
      amount: amountIn,
      isValid: true,
    };

    const action = handleAction(nameIn, actionObj);
    const { actionStr, amount, op, toAccount, userName } = action;

    const group = upperCaseEachWordify(defaults.accountGroup);
    const defaultToAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(toAccount).toBe(defaultToAccount);

    const what = !!group ? `${group} ${defaultToAccount}` : defaultToAccount;
    const makesIt = `[ makes ${what}: 100.00 ] `;

    // expect(actionStr).toBe(`${opIn} ${amountIn} ${makesIt}`);
    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);
  });

  it('should handle add to savings', function () {
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

    const action = handleAction(nameIn, actionObj);
    const { actionStr, amount, op, toAccount, userName } = action;
    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);

    const toAccountOut = upperCaseEachWordify(toAccountIn);
    expect(toAccount).toBe(upperCaseEachWordify(toAccountOut));

    const group = upperCaseEachWordify(defaults.accountGroup);
    const what = !!group ? `${group} ${toAccountOut}` : toAccountOut;

    const makesIt = `[ makes ${what}: 100.50 ] `;
    // expect(actionStr).toBe(`${opIn} ${amountIn} to ${toAccountIn} ${makesIt}`);
    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);
  });

  it('should handle add to my savings', function () {
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

    const action = handleAction(nameIn, actionObj);
    const { actionStr, amount, op, toAccount, userName } = action;
    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);

    const toAccountOut = upperCaseEachWordify(toAccountIn);
    expect(toAccount).toBe(upperCaseEachWordify(toAccountOut));

    const group = upperCaseEachWordify(defaults.accountGroup);
    const what = !!group ? `${group} ${toAccountOut}` : toAccountOut;

    const makesIt = `[ makes ${what}: 100.99 ] `;
    // expect(actionStr).toBe(`${opIn} ${amountIn} to ${toAccountIn} ${makesIt}`);
    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);
  });

  it('should handle spend from Main', function () {
    const nameIn = 'fred';
    const opIn = 'spend';
    const amountIn = 50;
    const actionObj = {
      actionStr: `${opIn} ${amountIn}`,
      op: opIn,
      amount: amountIn,
      isValid: true,
    };

    const action = handleAction(nameIn, actionObj);
    const { actionStr, amount, op, fromAccount, userName } = action;

    const group = upperCaseEachWordify(defaults.accountGroup);
    const defaultFromAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(fromAccount).toBe(defaultFromAccount);

    const what = !!group
      ? `${group} ${defaultFromAccount}`
      : defaultFromAccount;

    // First test added 100, this test spent 50, so expect 50:
    const makesIt = `[ makes ${what}: 50.00 ] `;

    // expect(actionStr).toBe(`${opIn} ${amountIn} ${makesIt}`);
    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);
  });

  it('should handle spend from Main on food', function () {
    const nameIn = 'fred';
    const opIn = 'spend';
    const amountIn = 25;
    const categoryIn = 'food';
    const actionObj = {
      actionStr: `${opIn} ${amountIn}`,
      op: opIn,
      amount: amountIn,
      isValid: true,
      category: categoryIn,
    };

    const action = handleAction(nameIn, actionObj);
    const { actionStr, amount, category, op, fromAccount, userName } = action;

    const group = upperCaseEachWordify(defaults.accountGroup);
    const defaultFromAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(category).toBe(upperCaseEachWordify(categoryIn));
    expect(fromAccount).toBe(defaultFromAccount);

    const what = !!group
      ? `${group} ${defaultFromAccount}`
      : defaultFromAccount;

    // First test added 100, prev test spent 50, this test spent 25, so expect 25:
    const makesIt = `[ makes ${what}: 25.00 ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName: nameIn,
      accountGroup: group,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[upperCaseEachWordify(categoryIn)].total).toBe(amountIn * 100);
  });

  it('should handle add to GroupX Main', function () {
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

    const action = handleAction(nameIn, actionObj);
    const { accountGroup, actionStr, amount, op, toAccount, userName } = action;

    const defaultToAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(accountGroup).toBe(accountGroupIn);
    expect(toAccount).toBe(defaultToAccount);

    const what = `${accountGroup} ${defaultToAccount}`;
    const makesIt = `[ makes ${what}: 100.00 ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);
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

    const action = handleAction(nameIn, actionObj);
    const {
      accountGroup,
      actionStr,
      amount,
      op,
      fromAccount,
      userName,
    } = action;

    const defaultFromAccount = upperCaseEachWordify(defaults.mainAccount);

    expect(userName).toBe(nameIn);
    expect(op).toBe(opIn);
    expect(amount).toBe(amountIn);
    expect(accountGroup).toBe(accountGroupIn);
    expect(fromAccount).toBe(defaultFromAccount);

    const what = `${accountGroup} ${defaultFromAccount}`;
    // First test added 100, this test spent 50.55, so expect 49.45:
    const makesIt = `[ makes ${what}: 49.45 ] `;

    expect(actionStr).toBe(`${actionObj.actionStr} ${makesIt}`);

    const defaultCategory = upperCaseEachWordify(defaults.spendCategory);

    const theTime = utcdayjs.utc();
    const categoryItem = findCategoryItem({
      userName: nameIn,
      accountGroup: accountGroupIn,
      year: theTime.format('YYYY'),
      month: theTime.format('MMM'),
    });
    const { spend } = categoryItem;
    expect(spend[upperCaseEachWordify(defaultCategory)].total).toBe(
      amountIn * 100
    );
  });
});
