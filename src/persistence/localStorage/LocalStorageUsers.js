import * as C from '../../constants';

const FAKE = false;
const FAKE_USER = {
  userName: 'test',
  email: 'test@test.com',
  password: '1',
};

let storage = window.localStorage;
const USERS_KEY = `__${C.APP_NAME}__users`;

class LocalStorageUsers {
  constructor() {
    const stuff = this.getStorageItem(USERS_KEY);
    if (!stuff) {
      this.setStorageItem(USERS_KEY, {});
    }
    if (FAKE) {
      this.registerUser(FAKE_USER);
    }
  }

  findUser(query) {
    const { userName } = query;
    if (userName) {
      const users = this.getStorageItem(USERS_KEY);
      return users[userName];
    }
    return undefined;
  }

  loginUser(userName, password) {
    const response = { ok: true, data: {} };
    const users = this.getStorageItem(USERS_KEY);
    const userObj = users[userName];

    if (!userObj) {
      response.ok = false;
      response.data.error = 'User with that name not found';
    } else {
      const { password: savedPassword } = userObj;
      if (password !== savedPassword) {
        response.ok = false;
        response.data.error = 'Invalid password';
      } else {
        response.data.text = users[userName];
      }
    }
    return response;
  }

  registerUser(userObj) {
    const response = { ok: true, data: {} };
    const { userName } = userObj;
    const users = this.getStorageItem(USERS_KEY);
    if (users[userName]) {
      response.ok = false;
      response.data.error = 'User with that name already exists';
    } else {
      // Add new user:
      users[userName] = {
        ...userObj,
        id: new Date().getTime(),
      };
      this.setStorageItem(USERS_KEY, users);
      response.data.text = users[userName];
    }
    return response;
  }

  // Private utility to get given item from
  // local storage:
  getStorageItem(key) {
    const item = storage.getItem(key);
    if (item) {
      return item ? JSON.parse(item) : item;
    }
  }

  // Private utility to set given item into
  // local storage:
  setStorageItem(key, item) {
    storage.setItem(key, JSON.stringify(item));
  }
}

const localStorageUsers = new LocalStorageUsers();
export default localStorageUsers;
