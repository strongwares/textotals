import { upperCaseEachWordify } from './utils';

const opRe = /^(add|spend|move|give|adjust|set|link|unlink)$/;
// const amountRe = /^(-?\d*[\.]?\d+)$/;
const addToRe = /^.*add.*\sto\s+(\w+\s*\w*)$/;

const spendOnFromRe = /^.*spend.*\son\s+(\w+\s*\w*)\s+from\s+(\w+\s*\w*)$/;
const spendOnRe = /^.*spend.*\son\s+(\w+\s*\w*)$/;
const spendCatRe = /^.*spend\s+-?\d*[.]?\d+\s+(\w+\s*\w*)$/;
const spendFromRe = /^.*spend.*\sfrom\s+(\w+\s*\w*)$/;

const moveToFromRe = /^.*move.*\sto\s+(\w+\s*\w*)\s+from\s+(\w+\s*\w*)$/;
const moveFromToRe = /^.*move.*\sfrom\s+(\w+\s*\w*)\s+to\s+(\w+\s*\w*)$/;
const moveToRe = /^.*move.*\sto\s+(\w+\s*\w*)$/;
const moveAcctRe = /^.*move\s+-?\d*[.]?\d+\s+(\w+\s*\w*)$/;

const giveToFromRe = /^.*give.*\sto\s+(.*)\s+from\s+(.*)$/;
const giveFromToRe = /^.*give.*\sfrom\s+(\w+\s*\w*)\s+to\s+(\w+\s*\w*)$/;
const giveToRe = /^.*give.*\sto\s+(\w+\s*\w*)$/;
const giveFromRe = /^.*give.*\sfrom\s+(\w+\s*\w*)$/;
const giveAcctRe = /^.*give\s+-?\d*[.]?\d+\s+(\w+\s*\w*)$/;

const setToRe = /^.*set\s+-?\d*[.]?\d+\s+(.*)$/;

const adjustToRe = /^.*adjust\s+-?\d*[.]?\d+\s+(.*)$/;

const linkFromToRe = /^.*link\s+from\s+(.*)\s+to\s+(.*)\s+with.*$/;

function parseAction(strIn) {
  const rval = {
    actionStr: strIn,
    isValid: false,
  };

  let opIdx = 0;
  let match;

  const str = strIn.toLowerCase().replace(',', '');

  const tokens = str.match(/\S+/g);

  while (opIdx < tokens.length && !rval.op) {
    if (opRe.test(tokens[opIdx])) {
      rval.op = tokens[opIdx];
    }
    opIdx++;
  }

  // Invalid!
  if (!rval.op) {
    return rval;
  }

  if (opIdx > 1) {
    rval.accountGroup = upperCaseEachWordify(
      tokens.slice(0, opIdx - 1).join(' ')
    );
  }

  if (rval.op === 'link') {
    // Special cases the link operation
    rval.linkId = tokens[tokens.length - 1];

    if (linkFromToRe.test(str)) {
      match = linkFromToRe.exec(str);
      rval.fromAccount = upperCaseEachWordify(match[1]);
      rval.toAccount = upperCaseEachWordify(match[2]);
      if (rval.linkId && rval.fromAccount && rval.toAccount) {
        rval.isValid = true;
      }
    } else {
      if (rval.linkId) {
        rval.isValid = true;
      }
    }
  } else if (rval.op === 'unlink') {
    // Special cases: unlink
    rval.linkId = tokens[tokens.length - 1];
    if (rval.linkId) {
      rval.isValid = true;
    }
  } else {
    // General action cases:
    rval.amount = tokens[opIdx];
    opIdx++;

    if (rval.op === 'add') {
      if (addToRe.test(str)) {
        match = addToRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        if (rval.toAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = !!rval.amount;
    } else if (rval.op === 'spend') {
      if (spendOnFromRe.test(str)) {
        match = spendOnFromRe.exec(str);
        rval.category = upperCaseEachWordify(match[1]);
        rval.fromAccount = upperCaseEachWordify(match[2]);
        if (rval.category && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (spendOnRe.test(str)) {
        match = spendOnRe.exec(str);
        rval.category = upperCaseEachWordify(match[1]);
        if (rval.category) {
          rval.isValid = true;
        }
      } else if (spendCatRe.test(str)) {
        match = spendCatRe.exec(str);
        rval.category = upperCaseEachWordify(match[1]);
        if (rval.category) {
          rval.isValid = true;
        }
      } else if (spendFromRe.test(str)) {
        match = spendFromRe.exec(str);
        rval.fromAccount = upperCaseEachWordify(match[1]);
        if (rval.fromAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = !!rval.amount;
    } else if (rval.op === 'move') {
      if (moveToFromRe.test(str)) {
        match = moveToFromRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        rval.fromAccount = upperCaseEachWordify(match[2]);
        if (rval.toAccount && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (moveFromToRe.test(str)) {
        match = moveFromToRe.exec(str);
        rval.fromAccount = upperCaseEachWordify(match[1]);
        rval.toAccount = upperCaseEachWordify(match[2]);
        if (rval.toAccount && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (moveToRe.test(str)) {
        match = moveToRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        if (rval.toAccount) {
          rval.isValid = true;
        }
      } else if (moveAcctRe.test(str)) {
        match = moveAcctRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        if (rval.toAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = !!rval.amount;
      if (
        rval.toAccount &&
        rval.fromAccount &&
        rval.toAccount === rval.fromAccount
      ) {
        rval.isValid = false;
      }
    } else if (rval.op === 'give') {
      if (giveToFromRe.test(str)) {
        match = giveToFromRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        rval.fromAccount = upperCaseEachWordify(match[2]);
        if (rval.toAccount && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (giveFromToRe.test(str)) {
        match = giveFromToRe.exec(str);
        rval.fromAccount = upperCaseEachWordify(match[1]);
        rval.toAccount = upperCaseEachWordify(match[2]);
        if (rval.toAccount && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (giveToRe.test(str)) {
        match = giveToRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        if (rval.toAccount) {
          rval.isValid = true;
        }
      } else if (giveFromRe.test(str)) {
        match = giveFromRe.exec(str);
        rval.fromAccount = upperCaseEachWordify(match[1]);
        if (rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (giveAcctRe.test(str)) {
        match = giveAcctRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        if (rval.toAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = !!rval.amount;
    } else if (rval.op === 'set') {
      if (setToRe.test(str)) {
        match = setToRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        if (rval.toAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = typeof rval.amount !== 'undefined';
    } else if (rval.op === 'adjust') {
      if (adjustToRe.test(str)) {
        match = adjustToRe.exec(str);
        rval.toAccount = upperCaseEachWordify(match[1]);
        if (rval.toAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = !!rval.amount;
    }
  }
  return rval;
}

export default parseAction;
