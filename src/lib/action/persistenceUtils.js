let persister;

function initPersistence(myPersister) {
  persister = myPersister;
}

function createAccountItemShell(action) {
  return {
    appName: action.appName,
    accountGroup: action.accountGroup,
    userId: action.userId,
    updateDate: new Date().getTime(),
    account: {},
    accountDate: {},
  };
}

function createCategoryItemShell(action, theTime) {
  return {
    appName: action.appName,
    accountGroup: action.accountGroup,
    userId: action.userId,
    updateDate: new Date().getTime(),
    spendCategory: {},
    giveAccount: {},
    year: theTime.format('YYYY'),
    month: theTime.format('MMM'),
  };
}

function createLinkItemShell(linkId, fromAccount, toAccount, action) {
  return {
    appName: action.appName,
    accountGroup: action.accountGroup,
    userId: action.userId,
    linkTimestampMs: new Date().getTime(),
    linkId,
    fromAccount,
    toAccount,
  };
}

// TODO:
function insertAction(action) {}

// *********************
// Account item support
function findAccountItem(query) {
  persister.findAccountItem(query);
}

function insertAccountItem(item) {
  persister.insertAccountItem(item);
}

function updateAccountItem(itemId, updateObj) {
  persister.updateAccountItem(itemId, updateObj);
}

// *********************
// Account category support
function findCategoryItem(query) {
  persister.findCategoryItem(query);
}

function insertCategoryItem(item) {
  persister.insertCategoryItem(item);
}

// TODO
function updateCategoryItem() {}

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

// TODO
function findUser(queryObj) {}

export {
  createAccountItemShell,
  createCategoryItemShell,
  createLinkItemShell,
  initPersistence,
  insertAction,
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
