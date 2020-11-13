let storage = window.localStorage;
const ACCOUNTS_KEY = 'accounts';
const CATEGORIES_KEY = 'categories';
const ACTIONS_KEY = 'actions';

class LocalStoragePersister {
  constructor() {
    // console.log('LocalStoragePersister constructed');
    // accounts:
    //  map: name+group -> {}
    //       it contains: [accountName]: { total, timestampMs }
    // categories:
    //  map: name+group+year+month -> {}
    //       it contains: { spend, give } with:
    //            give[category]: { total, timestampMs }
    //            spend[category]: { total, timestampMs }
    let stuff = this.getStorageItem(ACCOUNTS_KEY);
    if (!stuff) {
      this.setStorageItem(ACCOUNTS_KEY, {});
    }

    stuff = this.getStorageItem(CATEGORIES_KEY);
    if (!stuff) {
      this.setStorageItem(CATEGORIES_KEY, {});
    }

    stuff = this.getStorageItem(ACTIONS_KEY);
    if (!stuff) {
      this.setStorageItem(ACTIONS_KEY, {});
    }
  }

  // *********************
  // Accounts:
  addAccountItem(item) {
    const { accountGroup, userName } = item;
    const accounts = this.getStorageItem(ACCOUNTS_KEY);
    const accountGroups = accounts[userName];
    if (!accountGroups) {
      throw new Error(`addAccountItem: user ${userName} accounts not found`);
    }
    if (accountGroups[accountGroup]) {
      throw new Error(
        `addAccountItem: user ${userName} account group ${accountGroup} already exists`
      );
    }
    accountGroups[accountGroup] = {};
    this.setStorageItem(ACCOUNTS_KEY, accounts);

    return accountGroups[accountGroup];
  }

  findAccountItem(query) {
    const { accountGroup, userName } = query;
    const accounts = this.getStorageItem(ACCOUNTS_KEY);
    const accountGroups = accounts[userName];
    return accountGroups ? accountGroups[accountGroup] : {};
  }

  getAccountGroups(query) {
    const { userName } = query;
    const accounts = this.getStorageItem(ACCOUNTS_KEY);
    return accounts[userName] || {};
  }

  updateAccountItem(updateObj) {
    const { account, accountGroup, total, userName } = updateObj;
    const accounts = this.getStorageItem(ACCOUNTS_KEY);
    const accountGroups = accounts[userName];
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

    this.setStorageItem(ACCOUNTS_KEY, accounts);
  }

  // *********************
  // Actions:
  addAction(actionObj) {
    const { action, year, month } = actionObj;
    const { userName } = action;

    const key = `${userName}-${year}-${month}`;
    const actions = this.getStorageItem(ACTIONS_KEY);
    let userActions = actions[key];
    if (!userActions) {
      actions[key] = [];
      userActions = actions[key];
    }
    userActions.unshift(action);
    this.setStorageItem(ACTIONS_KEY, actions);
  }

  getActions(query) {
    const { userName, year, month } = query;

    let rval = [];

    const actions = this.getStorageItem(ACTIONS_KEY);

    const key = `${userName}-${year}-${month}`;
    const userActions = actions[key];

    if (userActions) {
      rval = userActions.slice();
    }
    return rval;
  }

  getLastActions(query) {
    const { numActions = 1, userName, year, month } = query;

    let rval = [];

    const actions = this.getStorageItem(ACTIONS_KEY);

    const key = `${userName}-${year}-${month}`;
    const userActions = actions[key];

    if (userActions) {
      rval = userActions.slice(0, numActions);
    }
    return rval;
  }

  // *********************
  // Categories:
  addCategoryItem(item) {
    const { accountGroup, month, userName, year } = item;

    const categories = this.getStorageItem(CATEGORIES_KEY);
    const userCategories = categories[userName];

    if (!userCategories) {
      throw new Error(`User ${userName} account categories not found`);
    }

    let accGroupCats = userCategories[accountGroup];
    if (!accGroupCats) {
      userCategories[accountGroup] = {};
      accGroupCats = userCategories[accountGroup];
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

    this.setStorageItem(CATEGORIES_KEY, categories);

    return accGroupCatsYears[month];
  }

  getCategories(query) {
    const { month, userName, year } = query;
    const rval = {};

    const categories = this.getStorageItem(CATEGORIES_KEY);
    const categoryGroups = categories[userName];
    if (!categoryGroups) {
      return rval;
    }

    Object.keys(categoryGroups).forEach((accountGroup) => {
      const accGroupCats = categoryGroups[accountGroup];
      const accGroupCatsYear = accGroupCats[year];
      if (accGroupCatsYear) {
        const accGroupCatsYearMonth = accGroupCatsYear[month];
        if (accGroupCatsYearMonth) {
          rval[accountGroup] = {
            year,
            month,
            spend: accGroupCatsYearMonth.spend,
            give: accGroupCatsYearMonth.give,
          };
        }
      }
    });
    return rval;
  }

  findCategoryItem(query) {
    const { accountGroup, month, userName, year } = query;

    const categories = this.getStorageItem(CATEGORIES_KEY);
    const userCategories = categories[userName];

    if (userCategories) {
      const accGroupCats = userCategories[accountGroup];
      if (accGroupCats) {
        const accGroupCatsYears = accGroupCats[year];
        return accGroupCatsYears ? accGroupCatsYears[month] : undefined;
      }
    }
    return undefined;
  }

  updateCategoryItem(updateObj) {
    const {
      accountGroup,
      giveCategory,
      month,
      spendCategory,
      total,
      userName,
      year,
    } = updateObj;

    const categories = this.getStorageItem(CATEGORIES_KEY);
    const userCategories = categories[userName];

    if (!userCategories) {
      throw new Error(`User ${userName} account categories not found`);
    }

    const accGroupCats = userCategories[accountGroup];
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

    this.setStorageItem(CATEGORIES_KEY, categories);
  }

  // *********************
  // Users:
  registerUser(userObj) {
    const { userName } = userObj;

    const accounts = this.getStorageItem(ACCOUNTS_KEY);
    if (!accounts[userName]) {
      accounts[userName] = {};
      this.setStorageItem(ACCOUNTS_KEY, accounts);

      const actions = this.getStorageItem(ACTIONS_KEY);
      actions[userName] = {};
      this.setStorageItem(ACTIONS_KEY, actions);

      const categories = this.getStorageItem(CATEGORIES_KEY);
      categories[userName] = {};
      this.setStorageItem(CATEGORIES_KEY, categories);
    }
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
