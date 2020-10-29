import { parseAction } from '../parseAction';

describe('action parser', function () {
  it('should parse add actions', function () {
    var action = 'add 100';
    var actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.isValid).toBe(true);

    action = 'add 100.50 to savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100.50');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.isValid).toBe(true);

    action = 'add 100 to my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);

    action = 'add 100.99 to My Savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX add 100.09';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.isValid).toBe(true);

    action = 'group a add 100.09';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX add 100 to fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('Fred');
    expect(actionObj.isValid).toBe(true);

    action = 'group a add 100 to fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('Fred');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX add 100 to fred b';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('Fred B');
    expect(actionObj.isValid).toBe(true);

    action = 'group a add 100 to fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('Fred');
    expect(actionObj.isValid).toBe(true);

    action = 'group a add 100 to fred b';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('add');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.toAccount).toBe('Fred B');
    expect(actionObj.isValid).toBe(true);
  });
  it('should parse spend actions', function () {
    var action = 'spend 100';
    var actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'groupX spend 100';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'group a spend 100';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'spend 100.09 on gas from savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.category).toBe('Gas');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX spend 100.09 on gas from savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.category).toBe('Gas');
    expect(actionObj.isValid).toBe(true);

    action = 'group a spend 100.09 on gas from savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.category).toBe('Gas');
    expect(actionObj.isValid).toBe(true);

    action = 'spend 100.09 on eating out from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.category).toBe('Eating Out');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX spend 100.09 on eating out from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.category).toBe('Eating Out');
    expect(actionObj.isValid).toBe(true);

    action = 'group a spend 100.09 on eating out from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.category).toBe('Eating Out');
    expect(actionObj.isValid).toBe(true);

    action = 'spend 100.09 gas';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe('Gas');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX spend 100.09 gas';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe('Gas');
    expect(actionObj.isValid).toBe(true);

    action = 'group a spend 100.09 gas';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.category).toBe('Gas');
    expect(actionObj.isValid).toBe(true);

    action = 'spend 100.09 from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'groupX spend 100.09 from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);

    action = 'group a spend 100.09 from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('spend');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.category).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
  });
  it('should parse move actions', function () {
    var action = 'move 100.09 to savings from main';
    var actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe('Main');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX move 100.09 to savings from main';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe('Main');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'group a move 100.09 to savings from main';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe('Main');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.09 from my savings to fred savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Fred Savings');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX move 100.09 from my savings to fred savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Fred Savings');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'group a move 100.09 from my savings to fred savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Fred Savings');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.99 to fred savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('Fred Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX move 100.99 to fred savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('Fred Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'group a move 100.99 to fred savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('Fred Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.99 savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX move 100.99 savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'group a move 100.99 savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.99 my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX move 100.99 my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'group a move 100.99 my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'move 100.99';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX  move 100.99';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'group a move 100.99';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('move');
    expect(actionObj.amount).toBe('100.99');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);
  });

  it('should parse give actions', function () {
    var action = 'give 100.09 to homeless under bridge from main';
    var actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Under Bridge');
    expect(actionObj.fromAccount).toBe('Main');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to homeless under bridge from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Under Bridge');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to homeless from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to some group from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Some Group');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from my savings to homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from my savings to Some Group';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Some Group');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from savings to some group';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Some Group');
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from my savings to some group';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Some Group');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to some group';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Some Group');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 to homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09 some group';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Some Group');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'give 100.09';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 to homeless under bridge from main';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Under Bridge');
    expect(actionObj.fromAccount).toBe('Main');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account a give 100.09 to homeless under bridge from main';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account A');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Under Bridge');
    expect(actionObj.fromAccount).toBe('Main');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 to homeless under bridge from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Under Bridge');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 to homeless under bridge from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Under Bridge');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 to homeless from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 to homeless from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 to homeless camp from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 to homeless camp from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 from my savings to homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 from my savings to homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 from my savings to homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 from my savings to homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 from savings to homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 from savings to homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 from my savings to homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 from my savings to homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 to homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 to homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 to homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 to homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 from savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 from savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 from my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 homeless';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09 homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09 homeless camp';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Homeless Camp');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'accountA give 100.09';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Accounta');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc give 100.09';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('give');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);
  });

  it('should parse textotals set actions', function () {
    var action = 'set 100.09 savings';
    var actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'set 100.10 my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.10');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'set 100.11';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.11');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX set 100.09 savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.09');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX set 100.10 my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.10');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX set 100.11';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.11');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc set 100.11';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
    expect(actionObj.op).toBe('set');
    expect(actionObj.amount).toBe('100.11');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);
  });

  it('should parse adjust actions', function () {
    var action = 'adjust 100.12 savings';
    var actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.12');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'adjust 100.13 my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.13');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'adjust 100.14';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.14');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX adjust 100.12 savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.12');
    expect(actionObj.toAccount).toBe('Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX adjust 100.13 my savings';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.13');
    expect(actionObj.toAccount).toBe('My Savings');
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'groupX adjust 100.14';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('adjust');
    expect(actionObj.amount).toBe('100.14');
    expect(actionObj.toAccount).toBe(undefined);
    expect(actionObj.fromAccount).toBe(undefined);
    expect(actionObj.isValid).toBe(true);
    // console.log(actionObj);

    action = 'account abc adjust 100.14';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Account Abc');
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
    var action = 'link with fred';
    var actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.isValid).toBe(true);

    action = 'link from myAccount to fredMain with fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.fromAccount).toBe('Myaccount');
    expect(actionObj.toAccount).toBe('Fredmain');
    expect(actionObj.isValid).toBe(true);

    action = 'link from my savings to fred main with fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.fromAccount).toBe('My Savings');
    expect(actionObj.toAccount).toBe('Fred Main');
    expect(actionObj.isValid).toBe(true);

    action = 'link from my fred savings to fred main b with fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.fromAccount).toBe('My Fred Savings');
    expect(actionObj.toAccount).toBe('Fred Main B');
    expect(actionObj.isValid).toBe(true);

    action = 'link from fred savings to fred main with fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.fromAccount).toBe('Fred Savings');
    expect(actionObj.toAccount).toBe('Fred Main');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX link fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.isValid).toBe(true);

    action = 'group a link fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX link with Fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.isValid).toBe(true);

    action = 'group a link with Fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX link from myAccount to fredmain with fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.fromAccount).toBe('Myaccount');
    expect(actionObj.toAccount).toBe('Fredmain');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX link from my fred a to fred main b with fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.fromAccount).toBe('My Fred A');
    expect(actionObj.toAccount).toBe('Fred Main B');
    expect(actionObj.isValid).toBe(true);

    action = 'group a link from myfredAccount to fredMain with fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group A');
    expect(actionObj.op).toBe('link');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.fromAccount).toBe('Myfredaccount');
    expect(actionObj.toAccount).toBe('Fredmain');
    expect(actionObj.isValid).toBe(true);

    action = 'unlink fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe(undefined);
    expect(actionObj.op).toBe('unlink');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.isValid).toBe(true);

    action = 'groupX unlink fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Groupx');
    expect(actionObj.op).toBe('unlink');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.isValid).toBe(true);

    action = 'group b unlink fred';
    actionObj = parseAction(action);
    expect(actionObj.group).toBe('Group B');
    expect(actionObj.op).toBe('unlink');
    expect(actionObj.linkId).toBe('fred');
    expect(actionObj.isValid).toBe(true);
  });
});
