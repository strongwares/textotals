const opRe = /^(add|spend|move|give|adjust|set|link|unlink)$/;
const amountRe = /^(-?\d*[\.]?\d+)$/;
const addToRe = /^.*add.*\sto\s+(\w+\s*\w*)$/;

// Intended to catch "spend 10 on gas from savings"
const spendOnFromRe = /^.*spend.*\son\s+(\w+\s*\w*)\s+from\s+(\w+\s*\w*)$/;

// Intended to catch "spend 10 on gas" with no from account
const spendOnRe = /^.*spend.*\son\s+(\w+\s*\w*)$/;

// Intended to catch "spend 10 gas" with no from account
const spendCatRe = /^.*spend\s+-?\d*[.]?\d+\s+(\w+\s*\w*)$/;
// const spendCatRe = /^.*spend\s+-?\d*[.]?\d+\s+(\w+\s*\w*)?!(.*from)$/;

// Intended to catch "spend 10 from account" with no category
// const spendFromRe = /^.*spend.*\s+from\s+(\w+\s*\w*)$/;
// const spendFromRe = /^.*spend.*from\s+(\w+\s*\w*)$/;
const spendFromRe = /^.*spend\s+-?\d*[.]?\d+\s+from\s+(\w+\s*\w*)$/;

const moveToFromRe = /^.*move.*\sto\s+(\w+\s*\w*)\s+from\s+(\w+\s*\w*)$/;
const moveFromToRe = /^.*move.*\sfrom\s+(\w+\s*\w*)\s+to\s+(\w+\s*\w*)$/;
const moveToRe = /^.*move.*\sto\s+(\w+\s*\w*)$/;
const moveAcctRe = /^.*move\s+-?\d*[.]?\d+\s+(\w+\s*\w*)$/;

const giveToFromRe = /^.*give.*\sto\s+(.*)\s+from\s+(.*)$/;
const giveFromToRe = /^.*give.*\sfrom\s+(\w+\s*\w*)\s+to\s+(\w+\s*\w*)$/;
const giveToRe = /^.*give.*\sto\s+(\w+\s*\w*)$/;
const giveFromRe = /^.*give.*\sfrom\s+(\w+\s*\w*)$/;
const giveAcctRe = /^.*give\s+-?\d*[.]?\d+\s+(\w+\s*\w*)$/;

// Intended to catch set 100 main
const setToRe = /^.*set\s+-?\d*[.]?\d+\s+(.*)$/;

const adjustToRe = /^.*adjust\s+-?\d*[.]?\d+\s+(.*)$/;

const linkFromToRe = /^.*link\s+from\s+(.*)\s+to\s+(.*)\s+with.*$/;

function parseAction(strIn) {
  const rval = {
    actionStr: strIn,
    isValid: false,
  };

  // console.log(`parse strIn: ${strIn}`);

  let tokenIdx = 0;
  let match;

  // const str = strIn.toLowerCase().replace(',', '');
  const str = strIn.replace(',', '');

  const tokens = str.match(/\S+/g);

  while (tokenIdx < tokens.length && !rval.op) {
    const token = tokens[tokenIdx];
    const tokenLc = token.toLowerCase();
    if (opRe.test(tokenLc)) {
      rval.op = tokens[tokenIdx];
    }
    tokenIdx++;
  }

  // Invalid!
  if (!rval.op) {
    return rval;
  }

  if (tokenIdx > 1) {
    const accountGroup = tokens.slice(0, tokenIdx - 1).join(' ');
    rval.accountGroup = accountGroup.toUpperCase();
  }

  if (rval.op === 'link') {
    // Special cases the link operation
    rval.linkId = tokens[tokens.length - 1];

    if (linkFromToRe.test(str)) {
      match = linkFromToRe.exec(str);
      // rval.fromAccount = upperCaseEachWordify(match[1]);
      // rval.toAccount = upperCaseEachWordify(match[2]);
      rval.fromAccount = match[1].toUpperCase();
      rval.toAccount = match[2].toUpperCase();
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
    rval.amount = tokens[tokenIdx];

    if (!amountRe.test(rval.amount)) {
      rval.isValid = false;
      rval.amount = undefined;
      return rval;
    }

    tokenIdx++;

    if (rval.op === 'add') {
      if (addToRe.test(str)) {
        match = addToRe.exec(str);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.toAccount = match[1].toUpperCase();
        if (rval.toAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = !!rval.amount;
    } else if (rval.op === 'spend') {
      // console.log(`str: ${str}`);
      if (spendOnFromRe.test(str)) {
        // console.log('testing spendOnFromRe');
        match = spendOnFromRe.exec(str);
        // rval.category = upperCaseEachWordifyIfNotAllCaps(match[1]);
        // rval.fromAccount = upperCaseEachWordifyIfNotAllCaps(match[2]);
        rval.category = match[1].toUpperCase();
        rval.fromAccount = match[2].toUpperCase();
        if (rval.category && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (spendOnRe.test(str) && !spendFromRe.test(str)) {
        // console.log('testing spendOnRe');
        match = spendOnRe.exec(str);
        // rval.category = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.category = match[1].toUpperCase();
        if (rval.category) {
          rval.isValid = true;
        }
      } else if (spendCatRe.test(str) && !spendFromRe.test(str)) {
        // console.log('testing spendCatRe');
        match = spendCatRe.exec(str);
        // rval.category = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.category = match[1].toUpperCase();
        // console.log(`category is ${rval.category}`);
        if (rval.category) {
          rval.isValid = true;
        }
      } else if (spendFromRe.test(str)) {
        // console.log('testing spendFrom');
        match = spendFromRe.exec(str);
        // rval.fromAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.fromAccount = match[1].toUpperCase();
        // console.log(`spend from account: ${rval.fromAccount}`);
        if (rval.fromAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = !!rval.amount;
    } else if (rval.op === 'move') {
      if (moveToFromRe.test(str)) {
        match = moveToFromRe.exec(str);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        // rval.fromAccount = upperCaseEachWordifyIfNotAllCaps(match[2]);
        rval.toAccount = match[1].toUpperCase();
        rval.fromAccount = match[2].toUpperCase();
        if (rval.toAccount && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (moveFromToRe.test(str)) {
        match = moveFromToRe.exec(str);
        // rval.fromAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[2]);
        rval.fromAccount = match[1].toUpperCase();
        rval.toAccount = match[2].toUpperCase();
        if (rval.toAccount && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (moveToRe.test(str)) {
        match = moveToRe.exec(str);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.toAccount = match[1].toUpperCase();
        if (rval.toAccount) {
          rval.isValid = true;
        }
      } else if (moveAcctRe.test(str)) {
        match = moveAcctRe.exec(str);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.toAccount = match[1].toUpperCase();
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
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        // rval.fromAccount = upperCaseEachWordifyIfNotAllCaps(match[2]);
        rval.toAccount = match[1].toUpperCase();
        rval.fromAccount = match[2].toUpperCase();
        if (rval.toAccount && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (giveFromToRe.test(str)) {
        match = giveFromToRe.exec(str);
        // rval.fromAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[2]);
        rval.fromAccount = match[1].toUpperCase();
        rval.toAccount = match[2].toUpperCase();
        if (rval.toAccount && rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (giveToRe.test(str)) {
        match = giveToRe.exec(str);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.toAccount = match[1].toUpperCase();
        if (rval.toAccount) {
          rval.isValid = true;
        }
      } else if (giveFromRe.test(str)) {
        match = giveFromRe.exec(str);
        // rval.fromAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.fromAccount = match[1].toUpperCase();
        if (rval.fromAccount) {
          rval.isValid = true;
        }
      } else if (giveAcctRe.test(str)) {
        match = giveAcctRe.exec(str);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.toAccount = match[1].toUpperCase();
        if (rval.toAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = !!rval.amount;
    } else if (rval.op === 'set') {
      if (setToRe.test(str)) {
        match = setToRe.exec(str);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.toAccount = match[1].toUpperCase();
        if (rval.toAccount) {
          rval.isValid = true;
        }
      }
      rval.isValid = typeof rval.amount !== 'undefined';
    } else if (rval.op === 'adjust') {
      if (adjustToRe.test(str)) {
        match = adjustToRe.exec(str);
        // rval.toAccount = upperCaseEachWordifyIfNotAllCaps(match[1]);
        rval.toAccount = match[1].toUpperCase();
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
