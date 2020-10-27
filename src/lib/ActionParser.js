class ActionParser {
  newAction(action) {
    console.log(`newAction: ${action}`);
    const parsed = this.validateActionStr(action);
    console.dir(parsed);
    return parsed;
  }

  validateActionStr(action) {
    let tokens;
    const rval = { valid: false };
    const actionStr = action.toLowerCase().replace(',', '');

    console.log('validateActionStr, checking action: ' + actionStr);

    var opRe = /^(add|spend|move|give|adjust|set)\s+(-?\d*[\.]?\d+)/;
    var groupOpRe = /^(\w+\s*\w*)\s+(add|spend|move|give|adjust|set)\s+(-?\d*[\.]?\d+)/;
    /*
    // There is a ".*" before the link phonenumber to allow for link <from> <to> <username>
    var linkRe = /^(link|unlink)\s+.*(\(?[2-9]{1}\d{2}\)?[-|\s]?[2-9]{1}\d{2}[-|\s]?\d{4})$/;
    var groupLinkRe = /^(\w+\s*\w*).*\s(link|unlink)\s+.*(\(?[2-9]{1}\d{2}\)?[-|\s]?[2-9]{1}\d{2}[-|\s]?\d{4})$/;
    */
    // There is a ".*" before the link id to allow for link <from> <to> <username>
    var linkRe = /^(link|unlink).*\s+(\w+)$/;
    var groupLinkRe = /^(\w+\s*\w*).*\s(link|unlink).*\s+(\w+)$/;
    if (opRe.test(actionStr)) {
      tokens = opRe.exec(actionStr);
      console.log('validateActionStr, op no group, tokens:');
      console.log(tokens);
      rval.op = tokens[1];
      rval.amount = tokens[2];
      rval.valid = true;
    } else if (groupOpRe.test(actionStr)) {
      tokens = groupOpRe.exec(actionStr);
      console.log('validateActionStr, op group prefix, tokens:');
      console.log(tokens);
      rval.group = this._upperCaseEachWordify(tokens[1]);
      rval.op = tokens[2];
      rval.amount = tokens[3];
      rval.valid = true;
    } else if (linkRe.test(actionStr)) {
      tokens = linkRe.exec(actionStr);
      console.log('validateActionStr, link no group, tokens:');
      console.log('linkId: ' + tokens[2]);
      console.log(tokens);
      rval.op = tokens[1];
      rval.linkId = tokens[2];
      rval.valid = true;
    } else if (groupLinkRe.test(actionStr)) {
      tokens = groupLinkRe.exec(actionStr);
      console.log('validateActionStr, link group prefix, tokens:');
      console.log('linkId: ' + tokens[3]);
      console.log(tokens);
      rval.group = this._upperCaseEachWordify(tokens[1]);
      rval.op = tokens[2];
      rval.linkId = tokens[3];
      rval.valid = true;
    }
    console.log('validateActionStr, rval:');
    console.log(rval);

    return rval;

    /*
    var re1 = /^(add|spend|move|give)\s+(-?\d*[\.]?\d+)/;
    var re2 = /^(adjust|set)\s+(-?\d*[\.]?\d+)/;
    var re3 = /^(link|unlink)\s+.*(\(?[2-9]{1}\d{2}\)?[-|\s]?[2-9]{1}\d{2}[-|\s]?\d{4})$/;
    var re4 = /^(show)\s+(balance|accounts|spending|giving)/;
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

  _normalizePhoneNum(num) {
    return !!num ? num.replace(/\D/g, '') : num;
  }

  _upperCaseEachWordify(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  _camelToDash(str) {
    return str
      .replace(/\W+/g, '-')
      .replace(/([a-z\d])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  _camelCaseify(str) {
    return this._dashToCamel(str.replace(' ', '-'));
  }

  _dashToCamel(str) {
    return str.replace(/(\-[a-z])/g, function ($1) {
      return $1.toUpperCase().replace('-', '');
    });
  }

  _trimWords(s, numWords) {
    const expString = s.split(/\s+/, numWords);
    if (expString.length >= numWords) {
      return expString.join(' ') + '…';
    }
    return s;
  }

  _capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

const actionParser = new ActionParser();
Object.freeze(actionParser);
export default actionParser;
