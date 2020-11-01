const FAKE = 1;
const FAKE_USER = {
  userName: 'test',
  email: 'test@test.com',
  password: '1',
};

class InMemoryPersister {
  constructor() {
    console.log('InMemoryPersister constructed');

    this.nextId = new Date().getTime();
    this.users = {};
    if (FAKE) {
      this.users[FAKE_USER.userName] = FAKE_USER;
    }
  }

  // *********************
  // Account item support
  findAccountItem(query) {
    console.log('InMemoryPersister findAccountItem, query:');
    console.dir(query);
  }

  insertAccountItem(item) {
    console.log('InMemoryPersister insertAccountItem, item:');
    item.id = this.nextId++;
    console.dir(item);
    return item;
  }

  updateAccountItem(itemId, updateObj) {
    console.log(
      `InMemoryPersister updateAccountItem, itemId: ${itemId}, updateObj:`
    );
    updateObj.timestampMs = new Date().getTime();
    console.dir(updateObj);
  }

  // *********************
  // Account category support
  findCategoryItem(query) {
    console.log('InMemoryPersister findCategoryItem query:');
    console.dir(query);
  }

  insertCategoryItem(item) {
    console.log('InMemoryPersister insertCategoryItem, item:');
    item.id = this.nextId++;
    console.dir(item);
    return item;
  }

  // *********************
  // Action support
  insertAction(action) {
    console.log('InMemoryPersister insertAction, action:');
    console.dir(action);
  }

  // *********************
  // User support
  findUser(query) {
    console.log('InMemoryPersister findUser, query:');
    console.dir(query);
    const { userName } = query;
    if (userName) {
      return this.users[userName];
    }
    return undefined;
  }

  loginUser(userName, password) {
    console.log(`InMemoryPersister loginUser ${userName}`);

    const response = { ok: true, data: {} };
    const userObj = this.users[userName];

    if (!userObj) {
      response.ok = false;
      response.data.error = 'User with that name not found';
    } else {
      const { password: savedPassword } = userObj;
      if (password !== savedPassword) {
        response.ok = false;
        response.data.error = 'Invalid password';
      } else {
        response.data.text = this.users[userName];
      }
    }
    return response;
  }

  registerUser(userObj) {
    console.log('InMemoryPersister register user, obj:');
    console.dir(userObj);
    const response = { ok: true, data: {} };
    const { userName } = userObj;
    if (this.users[userName]) {
      response.ok = false;
      response.data.error = 'User with that name already exists';
    } else {
      this.users[userName] = {
        ...userObj,
        id: new Date().getTime(),
      };
      response.data.text = this.users[userName];
    }
    return response;
  }
}

const inMemoryPersister = new InMemoryPersister();
export default inMemoryPersister;
