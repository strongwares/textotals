const DEFAULT_ACCOUNT_GROUP = 'Personal';

const FAKE = 1;
const FAKE_USER = {
  userName: 'test',
  email: 'test@test.com',
  password: '1',
};

let storage = window.localStorage;
const USERS_KEY = 'users';

class LocalStoragePersister {
  constructor() {
    // console.log('LocalStoragePersister constructed');
    // users: map name > obj
    // accounts:
    //  map: name+group -> {}
    //       it contains: [accountName]: { total, timestampMs }
    // categories:
    //  map: name+group+year+month -> {}
    //       it contains: { spend, give } with:
    //            give[category]: { total, timestampMs }
    //            spend[category]: { total, timestampMs }

    if (FAKE) {
      const users = this.getStorageItem(KEY_USERS);
      if (!users) {
        console.log('LocalStoragePersister adding users and fake user');
        this.setStorageItem(USERS_KEY, { [FAKE_USER.userName]: FAKE_USER });
      } else {
        if (!users[FAKE_USER.userName]) {
          console.log('LocalStoragePersister adding faker user to users');
          users[FAKE_USER.userName] = FAKE_USER;
          this.setStorageItem(USERS_KEY, users);
        } else {
          console.log('LocalStoragePersister fake user already exists');
        }
      }
    }
  }

  // *********************
  // Accounts:
  addAccountItem(item) {
    const { accountGroup = DEFAULT_ACCOUNT_GROUP, userName } = item;
    const key = `${userName}-${accountGroup}-accounts`;
    let accountsInGroup = this.getStorageItem(key);
    if (!accountsInGroup) {
      accountsInGroup = {};
      this.setStorageItem(key, accountsInGroup);
    }
    return accountsInGroup;
  }

  findAccountItem(query) {
    const { accountGroup = DEFAULT_ACCOUNT_GROUP, userName } = query;
    const key = `${userName}-${accountGroup}-accounts`;
    return this.getStorageItem(key);
  }

  updateAccountItem(updateObj) {
    const {
      account,
      accountGroup = DEFAULT_ACCOUNT_GROUP,
      total,
      userName,
    } = updateObj;

    const key = `${userName}-${accountGroup}-accounts`;
    let accountsInGroup = this.getStorageItem(key);
    if (!accountsInGroup) {
      throw new Error(`User ${userName} ${accountGroup} accounts not found`);
    }

    let theAccount = accountsInGroup[account];
    if (!theAccount) {
      accountsInGroup[account] = { total: 0 };
      theAccount = accountsInGroup[account];
    }
    theAccount.total = total;
    theAccount.timestampMs = new Date().getTime();

    this.setStorageItem(key, accountsInGroup);

    /*
    console.log(
      `\n*************\nInMemoryPersister updateAccountItem, updateObj:`
    );
    console.table(updateObj);
    console.log(
      `\n*************\nInMemoryPersister updateAccountItem, accounts:`
    );
    console.dir(this.accounts);
    */

    return theAccount;
  }

  // *********************
  // Actions:
  addAction(action) {}

  // *********************
  // Categories:
  addCategoryItem(item) {
    const {
      accountGroup = DEFAULT_ACCOUNT_GROUP,
      month,
      userName,
      year,
    } = item;

    const key = `${userName}-${accountGroup}-categories-${year}-${month}`;
    const accGroupCatsYearMonth = this.getStorageItem(key);

    if (!accGroupCatsYearMonth) {
      accGroupCatsYearMonth = { spend: {}, give: {} };
      this.setStorageItem(key, accGroupCatsYearMonth);
    }

    return accGroupCatsYearMonth;
  }

  findCategoryItem(query) {
    const {
      accountGroup = DEFAULT_ACCOUNT_GROUP,
      month,
      userName,
      year,
    } = query;

    const key = `${userName}-${accountGroup}-categories-${year}-${month}`;
    return this.getStorageItem(key);
  }

  updateCategoryItem(updateObj) {
    const {
      accountGroup = DEFAULT_ACCOUNT_GROUP,
      giveCategory,
      month,
      spendCategory,
      total,
      userName,
      year,
    } = updateObj;

    const key = `${userName}-${accountGroup}-categories-${year}-${month}`;
    const accGroupCatsYearMonth = this.getStorageItem(key);
    if (!accGroupCatsYearMonth) {
      throw new Error(
        `User ${userName} ${accountGroup} ${month} ${year} account categories not found`
      );
    }
    let theCategory;
    if (spendCategory) {
      theCategory = accGroupCatsYearMonth.spend[spendCategory];
      if (!theCategory) {
        accGroupCatsYearMonth.spend[spendCategory] = {};
        theCategory = accGroupCatsYearMonth.spend[spendCategory];
      }
    } else if (giveCategory) {
      theCategory = accGroupCatsYearMonth.give[giveCategory];
      if (!theCategory) {
        accGroupCatsYearMonth.give[giveCategory] = {};
        theCategory = accGroupCatsYearMonth.give[giveCategory];
      }
    }

    if (theCategory) {
      theCategory.total = total;
      theCategory.timestampMs = new Date().getTime();
      this.setStorageItem(key, accGroupCatsYearMonth);
    }

    return theCategory;
  }

  // *********************
  // Users:
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
        response.data.text = this.users[userName];
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
      response.data.text = this.users[userName];
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

const localStoragePersister = new LocalStoragePersister();
export default localStoragePersister;
