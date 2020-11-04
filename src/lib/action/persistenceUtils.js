let persister;

function initActionPersistence(myPersister) {
  persister = myPersister;
}

function createAccountItemShell({ accountGroup, userName }) {
  return {
    accountGroup,
    userName,
  };
}

function createCategoryItemShell({ accountGroup, month, userName, year }) {
  return {
    accountGroup,
    userName,
    year,
    month,
  };
}

function createLinkItemShell(
  linkId,
  fromAccount,
  toAccount,
  { accountGroup, userName }
) {
  return {
    accountGroup,
    userName,
    linkTimestampMs: new Date().getTime(),
    linkId,
    fromAccount,
    toAccount,
  };
}

function addAction(actionObj) {
  return persister.addAction(actionObj);
}

function getLastActions(query) {
  return persister.getLastActions(query);
}

// *********************
// Account item support
function findAccountItem(query) {
  return persister.findAccountItem(query);
}

function addAccountItem(item) {
  return persister.addAccountItem(item);
}

function updateAccountItem(itemId, updateObj) {
  return persister.updateAccountItem(itemId, updateObj);
}

// *********************
// Account category support
function findCategoryItem(query) {
  return persister.findCategoryItem(query);
}

function addCategoryItem(item) {
  return persister.addCategoryItem(item);
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
function addLinkItem(item) {}

// TODO
function removeLinkItem(options) {}

function findUser(query) {
  return persister.findUser(query);
}

export {
  addAction,
  addAccountItem,
  addCategoryItem,
  addLinkItem,
  createAccountItemShell,
  createCategoryItemShell,
  createLinkItemShell,
  findAccountItem,
  findCategoryItem,
  getLastActions,
  findLinkItem,
  findLinkItems,
  findUser,
  initActionPersistence,
  removeLinkItem,
  updateAccountItem,
  updateCategoryItem,
};
