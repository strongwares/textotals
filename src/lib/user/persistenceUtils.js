let persister;

function initUserPersistence(myPersister) {
  persister = myPersister;
}

async function findUser(query) {
  return persister.findUser(query);
}

async function loginUser(userName, password) {
  return persister.loginUser(userName, password);
}

async function registerUser(userObj) {
  return persister.registerUser(userObj);
}

export { findUser, initUserPersistence, loginUser, registerUser };
