const FAKE = 1;
const FAKE_USER = {
  userName: 'test',
  email: 'test@test.com',
  password: '1',
};

class InMemoryUsers {
  constructor() {
    this.users = {};
    if (FAKE) {
      this.registerUser(FAKE_USER);
    }
  }

  findUser(query) {
    const { userName } = query;
    if (userName) {
      return this.users[userName];
    }
    return undefined;
  }

  loginUser(userName, password) {
    // console.log(`InMemoryPersister loginUser ${userName}`);

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

const inMemoryUsers = new InMemoryUsers();
export default inMemoryUsers;
