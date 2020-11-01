let persister;

function initUserPersistence(myPersister) {
  persister = myPersister;
}

async function registerUser(userObj) {
  return persister.registerUser(userObj);
}

async function loginUser(userName, password) {
  return persister.loginUser(userName, password);
}

export { initUserPersistence, loginUser, registerUser };
