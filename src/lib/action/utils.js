function camelToDash(str) {
  if (!str) {
    return str;
  }
  return str
    .replace(/\W+/g, '-')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function camelCaseify(str) {
  if (!str) {
    return str;
  }
  return dashToCamel(str.replace(' ', '-'));
}

function capitalise(str) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function dashToCamel(str) {
  if (!str) {
    return str;
  }
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
  if (!str) {
    return;
  }
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export {
  camelToDash,
  camelCaseify,
  capitalise,
  dashToCamel,
  normalizePhoneNum,
  trimWords,
  upperCaseEachWordify,
};
