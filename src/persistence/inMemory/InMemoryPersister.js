const FAKE = 1;
const FAKE_USER = {
  userName: 'test',
  email: 'test@test.com',
  password: '1',
};

class InMemoryPersister {
  constructor() {
    // console.log('InMemoryPersister constructed');
    this.users = {};
    this.accounts = {};
    this.categories = {};
    this.actions = {};
    if (FAKE) {
      this.registerUser(FAKE_USER);
    }
  }

  // *********************
  // Account item support
  addAccountItem(item) {
    // console.log('\n************\nInMemoryPersister addAccountItem, item:');
    // console.table(item);
    const { accountGroup, userName } = item;
    const accountGroups = this.accounts[userName];
    if (!accountGroups) {
      throw new Error(`addAccountItem: user ${userName} accounts not found`);
    }
    if (accountGroups[accountGroup]) {
      throw new Error(
        `addAccountItem: user ${userName} account group ${accountGroup} already exists`
      );
    }

    accountGroups[accountGroup] = {};
    return accountGroups[accountGroup];
  }

  findAccountItem(query) {
    // console.log('\n**********\nInMemoryPersister findAccountItem, query:');
    // console.table(query);
    // query is basically: userName, accountGroup
    // need: name -> accountGroup -> data
    const { accountGroup, userName } = query;
    const accountGroups = this.accounts[userName];
    return accountGroups ? accountGroups[accountGroup] : undefined;
  }

  getAccountGroups(query) {
    const { userName } = query;
    return this.accounts[userName];
  }

  updateAccountItem(updateObj) {
    /*
    console.log(
      `\n*************\nInMemoryPersister updateAccountItem, itemId: ${itemId}, updateObj:`
    );
    console.table(updateObj);
    */

    const { account, accountGroup, total, userName } = updateObj;
    const accountGroups = this.accounts[userName];
    if (!accountGroups) {
      throw new Error(`User ${userName} accounts not found`);
    }

    const accountsInGroup = accountGroups[accountGroup];
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
  // Account category support

  addCategoryItem(item) {
    // console.log('InMemoryPersister addCategoryItem, item:');
    // console.dir(item);
    const { accountGroup, month, userName, year } = item;
    const categories = this.categories[userName];
    if (!categories) {
      throw new Error(`User ${userName} account categories not found`);
    }

    let accGroupCats = categories[accountGroup];
    if (!accGroupCats) {
      categories[accountGroup] = {};
      accGroupCats = categories[accountGroup];
    }

    let accGroupCatsYears = accGroupCats[year];
    if (!accGroupCatsYears) {
      accGroupCats[year] = {};
      accGroupCatsYears = accGroupCats[year];
    }

    if (accGroupCatsYears[month]) {
      throw new Error(
        `User ${userName} ${accountGroup} ${month} ${year} account categories already exists`
      );
    }

    accGroupCatsYears[month] = { spend: {}, give: {} };
    return accGroupCatsYears[month];
  }

  findCategoryItem(query) {
    // console.log('InMemoryPersister findCategoryItem query:');
    // console.dir(query);
    const { accountGroup, month, userName, year } = query;
    const categoryGroups = this.categories[userName];
    if (categoryGroups) {
      const accGroupCats = categoryGroups[accountGroup];
      if (accGroupCats) {
        const accGroupCatsYears = accGroupCats[year];
        return accGroupCatsYears ? accGroupCatsYears[month] : undefined;
      }
    }
    return undefined;
  }

  updateCategoryItem(updateObj) {
    /*
    console.log(
      `InMemoryPersister updateCategoryItem, itemId: ${itemId}, item:`
    );
    console.table(updateObj);
    */

    const {
      accountGroup,
      giveCategory,
      month,
      spendCategory,
      total,
      userName,
      year,
    } = updateObj;

    const categories = this.categories[userName];
    if (!categories) {
      throw new Error(`User ${userName} account categories not found`);
    }

    const accGroupCats = categories[accountGroup];
    if (!accGroupCats) {
      throw new Error(
        `User ${userName} ${accountGroup} account categories not found`
      );
    }

    const accGroupCatsYears = accGroupCats[year];
    if (!accGroupCatsYears) {
      throw new Error(
        `User ${userName} ${accountGroup} ${year} account categories not found`
      );
    }

    const accGroupCatsYearsMonth = accGroupCatsYears[month];
    if (!accGroupCatsYearsMonth) {
      throw new Error(
        `User ${userName} ${accountGroup} ${month} ${year} account categories not found`
      );
    }
    let theCategory;
    if (spendCategory) {
      theCategory = accGroupCatsYearsMonth.spend[spendCategory];
      if (!theCategory) {
        accGroupCatsYearsMonth.spend[spendCategory] = {};
        theCategory = accGroupCatsYearsMonth.spend[spendCategory];
      }
      theCategory.total = total;
      theCategory.timestampMs = new Date().getTime();
    } else if (giveCategory) {
      theCategory = accGroupCatsYearsMonth.give[giveCategory];
      if (!theCategory) {
        accGroupCatsYearsMonth.give[giveCategory] = {};
        theCategory = accGroupCatsYearsMonth.give[giveCategory];
      }
      theCategory.total = total;
      theCategory.timestampMs = new Date().getTime();
    }

    /*
    console.log(
      `\n*************\nInMemoryPersister updateCategoryItem, updateObj:`
    );
    console.table(updateObj);
    console.log(
      `\n*************\nInMemoryPersister updateCategoryItem, categories:`
    );
    console.dir(this.categories);
    */

    return theCategory;
  }

  // *********************
  // Action support
  addAction(actionObj) {
    const { action, year, month } = actionObj;
    // console.log('InMemoryPersister addAction, action:');
    // console.dir(action);
    const { userName } = action;
    const key = `${userName}-${year}-${month}`;
    let actions = this.actions[key];
    if (!actions) {
      this.actions[key] = [];
      actions = this.actions[key];
    }
    actions.unshift(action);

    // console.log(`addAction key: ${key}:`);
    // console.table(action);
  }

  getActions(query) {
    const { userName, year, month } = query;

    let rval = [];

    const key = `${userName}-${year}-${month}`;

    const actions = this.actions[key];
    if (actions) {
      rval = actions.slice();
    }
    return rval;
  }

  getLastActions(query) {
    const { numActions = 1, userName, year, month } = query;

    let rval = [];

    const key = `${userName}-${year}-${month}`;

    const actions = this.actions[key];
    if (actions) {
      rval = actions.slice(0, numActions);
    }
    return rval;
  }

  // *********************
  // User support
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
    // console.log('InMemoryPersister register user, obj:');
    // console.dir(userObj);
    const response = { ok: true, data: {} };
    const { userName } = userObj;
    if (this.users[userName]) {
      response.ok = false;
      response.data.error = 'User with that name already exists';
    } else {
      // Add new user:
      this.users[userName] = {
        ...userObj,
        id: new Date().getTime(),
      };
      response.data.text = this.users[userName];

      this.accounts[userName] = {};
      this.actions[userName] = [];
      this.categories[userName] = {};
    }
    return response;
  }
}

const inMemoryPersister = new InMemoryPersister();
export default inMemoryPersister;
