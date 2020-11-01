let persister;

function initActionPersistence(myPersister) {
  persister = myPersister;
}

function createAccountItemShell(action) {
  return {
    accountGroup: action.accountGroup,
    userName: action.userName,
    timestampMs: new Date().getTime(),
    account: {},
    accountDate: {},
  };
}

function createCategoryItemShell(action, theTime) {
  return {
    accountGroup: action.accountGroup,
    userName: action.userName,
    timestampMs: new Date().getTime(),
    spendCategory: {},
    giveAccount: {},
    year: theTime.format('YYYY'),
    month: theTime.format('MMM'),
  };
}

function createLinkItemShell(linkId, fromAccount, toAccount, action) {
  return {
    accountGroup: action.accountGroup,
    userName: action.userName,
    linkTimestampMs: new Date().getTime(),
    linkId,
    fromAccount,
    toAccount,
  };
}

function insertAction(action) {
  return persister.insertAction(action);
}

// *********************
// Account item support
function findAccountItem(query) {
  return persister.findAccountItem(query);
}

function insertAccountItem(item) {
  return persister.insertAccountItem(item);
}

function updateAccountItem(itemId, updateObj) {
  return persister.updateAccountItem(itemId, updateObj);
}

// *********************
// Account category support
function findCategoryItem(query) {
  return persister.findCategoryItem(query);
}

function insertCategoryItem(item) {
  return persister.insertCategoryItem(item);
}

function updateCategoryItem(itemId, updateObj) {
  return persister.updateCategoryItem(itemId, updateObj);
}

// TODO
// find one
function findLinkItem(filter, options) {}

// TODO
// find all
function findLinkItems(filter, options) {}

// TODO
function insertLinkItem(item) {}

// TODO
function removeLinkItem(options) {}

function findUser(query) {
  return persister.findUser(query);
}

function insertUser(userObj) {
  return persister.insertUser(userObj);
}

export {
  createAccountItemShell,
  createCategoryItemShell,
  createLinkItemShell,
  initActionPersistence,
  insertAction,
  insertUser,
  findAccountItem,
  findCategoryItem,
  findLinkItem,
  findLinkItems,
  findUser,
  insertAccountItem,
  insertCategoryItem,
  insertLinkItem,
  removeLinkItem,
  updateAccountItem,
  updateCategoryItem,
};
