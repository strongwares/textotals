import * as C from '../../constants';

let storage = window.localStorage;

const ACCOUNTS_KEY = `__${C.APP_NAME}__accounts`;
const CATEGORIES_KEY = `__${C.APP_NAME}__categories`;
const ACTIONS_KEY = `__${C.APP_NAME}_actions`;

const DELETE_ALL = false;

// TODO: Bad duplication
// TODO: Only change this if you are changing lib/action/handleAccountAction
const TOTALS_SEP = '::';
const ACCOUNT_SEP = ':;:';

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
    if (DELETE_ALL) {
      this.setStorageItem(ACCOUNTS_KEY, {});
      this.setStorageItem(CATEGORIES_KEY, {});
      this.setStorageItem(ACTIONS_KEY, {});
      return;
    }

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
    const { accountGroup, userName, force } = item;
    const accounts = this.getStorageItem(ACCOUNTS_KEY);
    const accountGroups = accounts[userName];

    if (!accountGroups) {
      throw new Error(`addAccountItem: user ${userName} accounts not found`);
    }

    if (!force && accountGroups[accountGroup]) {
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
    const { accountGroup, op, userName } = action;

    const key = `${userName}-${year}-${month}`;

    const actions = this.getStorageItem(ACTIONS_KEY);
    let userActions = actions[userName];
    if (!userActions) {
      userActions = {
        [key]: [],
      };
      this.setStorageItem(ACTIONS_KEY, actions);
    } else {
      if (!userActions[key]) {
        userActions[key] = [];
      } else if (op === 'clear') {
        const newActions = userActions[key].filter(
          (action) => action.accountGroup !== accountGroup
        );
        userActions[key] = newActions;
      }
    }
    const userActionsList = userActions[key];

    userActionsList.unshift(action);
    this.setStorageItem(ACTIONS_KEY, actions);
  }

  getActions(query) {
    const { userName, year, month, filter } = query;

    const key = `${userName}-${year}-${month}`;
    let rval = [];

    const actions = this.getStorageItem(ACTIONS_KEY);
    const userActions = actions[userName];
    if (userActions && userActions[key]) {
      rval = userActions[key].slice();
      if (filter) {
        const { group, op } = filter;
        rval = rval.filter((action) => {
          return action.accountGroup === group && action.op === op;
        });
      }
    }
    return rval;
  }

  pruneActions(query) {
    const { month, prevMonth, prevYear, year, userName } = query;
    const prevKey = `${userName}-${prevYear}-${prevMonth}`;
    const key = `${userName}-${year}-${month}`;
    const actions = this.getStorageItem(ACTIONS_KEY);
    const userActions = actions[userName];
    if (!userActions) {
      return;
    }
    const prevMonthActions = userActions[prevKey];
    if (!prevMonthActions) {
      return;
    }
    let curMonthActions = userActions[key];
    if (!curMonthActions) {
      userActions[key] = [];
      curMonthActions = userActions[key];
    }

    const prevLen = prevMonthActions.length;
    const copySize = prevLen > 16 ? Math.floor(prevLen / 4) : prevLen;
    for (let i = prevLen - 1; i >= prevLen - copySize; i--) {
      curMonthActions.push(prevMonthActions[i]);
    }

    // Only need to put a response action if any records were
    // not actually copied from prev month to this month's list:
    if (copySize !== prevLen) {
      curMonthActions.push({
        userName,
        accountGroup: undefined,
        timestampMs: new Date().getTime(),
        actionStr: `${TOTALS_SEP}${C.APP_NAME}${ACCOUNT_SEP}I pruned old actions from last month to save space`,
        amount: undefined,
        op: undefined,
      });
    }
    delete userActions[prevKey];
    this.setStorageItem(ACTIONS_KEY, actions);
  }

  getLastActions(query) {
    const { numActions = 1, userName, year, month } = query;

    const key = `${userName}-${year}-${month}`;
    let rval = [];

    const actions = this.getStorageItem(ACTIONS_KEY);
    const userActions = actions[userName];
    if (userActions && userActions[key]) {
      rval = userActions[key].slice(0, numActions);
    }
    return rval;
  }

  // *********************
  // Categories:
  addCategoryItem(item) {
    const { accountGroup, force, month, userName, year } = item;

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

    if (!force && accGroupCatsYears[month]) {
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

  unRegisterUser(userObj) {
    const { userName } = userObj;

    console.log(`unregistering user '${userName}`);

    const accounts = this.getStorageItem(ACCOUNTS_KEY);
    if (accounts[userName]) {
      delete accounts[userName];
      this.setStorageItem(ACCOUNTS_KEY, accounts);

      const actions = this.getStorageItem(ACTIONS_KEY);
      delete actions[userName];
      this.setStorageItem(ACTIONS_KEY, actions);

      const categories = this.getStorageItem(CATEGORIES_KEY);
      delete categories[userName];
      this.setStorageItem(CATEGORIES_KEY, categories);
    } else {
      console.error(`unRegister ${userName}, accounts not found`);
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
