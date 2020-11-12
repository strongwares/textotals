import parseAction from '../parseAction';

describe('test action parser', function () {
  it('should parse add actions', function () {
    var action = 'add 100';
    var actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.isValid).toBe(true);

    action = 'add 100.50 to savings';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100.50');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.isValid).toBe(true);

    action = 'add 100 to my savings';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);

    action = 'add 100.99 to My Savings';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);

    action = 'groupx add 100.09';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.isValid).toBe(true);

    action = 'group a add 100.09';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX add 100 to fred';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A add 100 to FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX add 100 to FRED b';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('FRED B');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A add 100 to FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A add 100 to FRED b';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('FRED B');
    expect(actionObj.isValid).toBe(true);
  });
  it('should parse spend actions', function () {
    var action = 'spend 100';
    var actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX spend 100';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A spend 100';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'spend 100.09 on gas from savings';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.category).toBe('GAS');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX spend 100.09 on GAS from SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.category).toBe('GAS');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A spend 100.09 on GAS from SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.category).toBe('GAS');
    expect(actionObj.isValid).toBe(true);

    action = 'spend 100.09 on eating out from my savings';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.category).toBe('EATING OUT');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX spend 100.09 on EATING OUT from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.category).toBe('EATING OUT');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A spend 100.09 on EATING OUT from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.category).toBe('EATING OUT');
    expect(actionObj.isValid).toBe(true);

    action = 'spend 100.09 GAS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe('GAS');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX spend 100.09 GAS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe('GAS');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A spend 100.09 GAS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe('GAS');
    expect(actionObj.isValid).toBe(true);

    action = 'spend 100.09 from SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX spend 100.09 from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A spend 100.09 from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
  });
  it('should parse move actions', function () {
    var action = 'move 100.09 to savings from main';
    var actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe('MAIN');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX move 100.09 to SAVINGS from MAIN';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe('MAIN');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUP A move 100.09 to SAVINGS from MAIN';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe('MAIN');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.09 from MY SAVINGS to FRED SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('FRED SAVINGS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX move 100.09 from MY SAVINGS to FRED SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('FRED SAVINGS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUP A move 100.09 from MY SAVINGS to FRED SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('FRED SAVINGS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.99 to FRED SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('FRED SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX move 100.99 to FRED SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('FRED SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUP A move 100.99 to FRED SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('FRED SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.99 SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX move 100.99 SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUP A move 100.99 SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.99 MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX move 100.99 MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUP A move 100.99 MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.99';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX  move 100.99';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUP A move 100.99';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);
  });

  it('should parse give actions', function () {
    var action = 'give 100.09 to HOMELESS HOME from MAIN';
    var actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MAIN');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to HOMELESS home from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to homeless from My Savings';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to Some group from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SOME GROUP');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from MY SAVINGS to HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from MY SAVINGS to Some Group';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SOME GROUP');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from SAVINGS to SOME GROUP';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SOME GROUP');
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from MY SAVINGS to SOME GROUP';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SOME GROUP');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to SOME GROUP';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SOME GROUP');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 SOME GROUP';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SOME GROUP');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 to HOMELESS HOME from MAIN';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MAIN');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account A give 100.09 to HOMELESS HOME from MAIN';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT A');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MAIN');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 to HOMELESS HOME from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 to HOMELESS HOME from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 to HOMELESS from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 to HOMELESS from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 to Homeless Home from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 to HOMELESS HOME from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 from MY SAVINGS to HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 from MY SAVINGS to HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 from MY SAVINGS to HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 from MY SAVINGS to HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 from SAVINGS to HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 from SAVINGS to HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 from MY SAVINGS to HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 from MY SAVINGS to HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 to HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 to HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 to HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 to HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 from SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 from SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 from MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 HOMELESS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09 HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09 HOMELESS HOME';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('HOMELESS HOME');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // consoleaccountaionObj);

    action = 'accounta give 100.09';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNTA');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC give 100.09';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);
  });

  it('should parse textotals set actions', function () {
    var action = 'set 100.09 SAVINGS';
    var actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'set 100.10 MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.10');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'set 100.11';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.11');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'set MAIN 100.11';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe(undefined);
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(false);

    action = 'GROUPX set 100.09 SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX set 100.10 MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.10');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX set 100.11';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.11');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC set 100.11';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.11');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);
  });

  it('should parse adjust actions', function () {
    var action = 'adjust 100.12 SAVINGS';
    var actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.12');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'adjust 100.13 MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.13');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'adjust 100.14';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.14');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX adjust 100.12 SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.12');
    expect(actionObj.toAccount).toBe('SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX adjust 100.13 MY SAVINGS';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.13');
    expect(actionObj.toAccount).toBe('MY SAVINGS');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'GROUPX adjust 100.14';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.14');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'ACCOUNT ABC adjust 100.14';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('ACCOUNT ABC');
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.14');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);
  });

  // link with <target user id>
  // link from <from account> <to account> with <target user id>
  it('should parse link actions', function () {
    var action = 'link with FRED';
    var actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'link from myAccount to FREDMain with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.fromAccount).toBe('MYACCOUNT');
    expect(actionObj.toAccount).toBe('FREDMAIN');
    expect(actionObj.isValid).toBe(true);

    action = 'link from MY SAVINGS to FRED MAIN with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.fromAccount).toBe('MY SAVINGS');
    expect(actionObj.toAccount).toBe('FRED MAIN');
    expect(actionObj.isValid).toBe(true);

    action = 'link from MY FRED SAVINGS to FRED MAIN b with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.fromAccount).toBe('MY FRED SAVINGS');
    expect(actionObj.toAccount).toBe('FRED MAIN B');
    expect(actionObj.isValid).toBe(true);

    action = 'link from FRED SAVINGS to FRED MAIN with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.fromAccount).toBe('FRED SAVINGS');
    expect(actionObj.toAccount).toBe('FRED MAIN');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX link FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A link FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX link with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A link with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX link from MYACCOUNT to FREDMAIN with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.fromAccount).toBe('MYACCOUNT');
    expect(actionObj.toAccount).toBe('FREDMAIN');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX link from MY FRED a to FRED MAIN b with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.fromAccount).toBe('MY FRED A');
    expect(actionObj.toAccount).toBe('FRED MAIN B');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUP A link from myFREDAccount to FREDMain with FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP A');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.fromAccount).toBe('MYFREDACCOUNT');
    expect(actionObj.toAccount).toBe('FREDMAIN');
    expect(actionObj.isValid).toBe(true);

    action = 'unlink FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe(undefined);
    expect(actionObj.op).toBe('unlink');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'GROUPX unlink FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUPX');
    expect(actionObj.op).toBe('unlink');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.isValid).toBe(true);

    action = 'group B unlink FRED';
    actionObj = parseAction(action);
    expect(actionObj.accountGroup).toBe('GROUP B');
    expect(actionObj.op).toBe('unlink');
    expect(actionObj.linkId).toBe('FRED');
    expect(actionObj.isValid).toBe(true);
  });
});
