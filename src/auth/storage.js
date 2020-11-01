const KEY = 'authToken';

let myStorage = window.localStorage;

function getToken() {
  try {
    return myStorage.getItem(KEY);
  } catch (error) {
    console.log(`Error loading persisted auth token: ${error}`);
  }
}

function getUser() {
  const userObj = getToken();
  return userObj ? JSON.parse(userObj) : null;
}

function removeToken() {
  try {
    myStorage.removeItem(KEY);
  } catch (error) {
    console.log(`Error removing persisted auth token: ${error}`);
  }
}

function storeToken(authToken) {
  try {
    myStorage.setItem(KEY, authToken);
  } catch (error) {
    console.log(`Error storing auth token: ${error}`);
  }
}

const storage = { getUser, getToken, removeToken, storeToken };
export default storage;
