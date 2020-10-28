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
    msg: strIn,
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
    rval.group = upperCaseEachWordify(tokens.slice(0, opIdx - 1).join(' '));
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

/* eslint-disable-next-line no-unused-vars */
function oldActionStrToValidObject(action) {
  let tokens;
  const rval = { valid: false };
  const actionStr = action.toLowerCase().replace(',', '');

  console.log('actionStrToValidObject, checking action: ' + actionStr);

  // const opRe = /^(add|spend|move|give|adjust|set)\s+(-?\d*[\.]?\d+)/;
  // const groupOpRe = /^(\w+\s*\w*)\s+(add|spend|move|give|adjust|set)\s+(-?\d*[\.]?\d+)/;

  // Extract the operation:
  const opRe = /^(add|spend|move|give|adjust|set)\s+(-?\d*[.]?\d+)/;

  // Extract the optional group prefix:
  const groupOpRe = /^(\w+\s*\w*)\s+(add|spend|move|give|adjust|set)\s+(-?\d*[.]?\d+)/;

  /*
    // There is a ".*" before the link phonenumber to allow for link <from> <to> <username>
    const linkRe = /^(link|unlink)\s+.*(\(?[2-9]{1}\d{2}\)?[-|\s]?[2-9]{1}\d{2}[-|\s]?\d{4})$/;
    const groupLinkRe = /^(\w+\s*\w*).*\s(link|unlink)\s+.*(\(?[2-9]{1}\d{2}\)?[-|\s]?[2-9]{1}\d{2}[-|\s]?\d{4})$/;
    */
  // There is a ".*" before the link id to allow for link <from> <to> <username>
  const linkRe = /^(link|unlink).*\s+(\w+)$/;
  const groupLinkRe = /^(\w+\s*\w*).*\s(link|unlink).*\s+(\w+)$/;

  if (opRe.test(actionStr)) {
    tokens = opRe.exec(actionStr);
    console.log('actionStrToValidObject, op no group, tokens:');
    console.table(tokens);
    rval.op = tokens[1];
    rval.amount = tokens[2];
    rval.valid = true;
  } else if (groupOpRe.test(actionStr)) {
    tokens = groupOpRe.exec(actionStr);
    console.log('actionStrToValidObject, op with group prefix, tokens:');
    console.table(tokens);
    rval.group = upperCaseEachWordify(tokens[1]);
    rval.op = tokens[2];
    rval.amount = tokens[3];
    rval.valid = true;
  } else if (linkRe.test(actionStr)) {
    tokens = linkRe.exec(actionStr);
    console.log('actionStrToValidObject, link no group, tokens:');
    console.log('linkId: ' + tokens[2]);
    console.table(tokens);
    rval.op = tokens[1];
    rval.linkId = tokens[2];
    rval.valid = true;
  } else if (groupLinkRe.test(actionStr)) {
    tokens = groupLinkRe.exec(actionStr);
    console.log('actionStrToValidObject, link group prefix, tokens:');
    console.log('linkId: ' + tokens[3]);
    console.table(tokens);
    rval.group = upperCaseEachWordify(tokens[1]);
    rval.op = tokens[2];
    rval.linkId = tokens[3];
    rval.valid = true;
  }
  console.log('actionStrToValidObject, rval:');
  console.table(rval);

  return rval;

  /*
    const re1 = /^(add|spend|move|give)\s+(-?\d*[\.]?\d+)/;
    const re2 = /^(adjust|set)\s+(-?\d*[\.]?\d+)/;
    const re3 = /^(link|unlink)\s+.*(\(?[2-9]{1}\d{2}\)?[-|\s]?[2-9]{1}\d{2}[-|\s]?\d{4})$/;
    const re4 = /^(show)\s+(balance|accounts|spending|giving)/;
    if (re1.test(actionStr)) {
      return re1.exec(actionStr);
    }
    else if (re2.test(actionStr)) {
      return re2.exec(actionStr);
    }
    else if(re3.test(actionStr)) {
      return re3.exec(actionStr);
    }
    else if (actionStr === "help") {
      return ['help','help'];
    }
    else if(re4.test(actionStr)) {
      return re4.exec(actionStr);
    }
    */
}

function camelToDash(str) {
  return str
    .replace(/\W+/g, '-')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function camelCaseify(str) {
  return this._dashToCamel(str.replace(' ', '-'));
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function dashToCamel(str) {
  return str.replace(/(-[a-z])/g, function ($1) {
    return $1.toUpperCase().replace('-', '');
  });
}

function normalizePhoneNum(num) {
  return !!num ? num.replace(/\D/g, '') : num;
}

function trimWords(s, numWords) {
  const expString = s.split(/\s+/, numWords);
  if (expString.length >= numWords) {
    return expString.join(' ') + '…';
  }
  return s;
}

function upperCaseEachWordify(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export {
  parseAction,
  camelToDash,
  camelCaseify,
  capitalise,
  dashToCamel,
  normalizePhoneNum,
  trimWords,
  upperCaseEachWordify,
};
