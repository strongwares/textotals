class InMemoryPersister {
  constructor() {
    // console.log('InMemoryPersister constructed');
    this.accounts = {};
    this.categories = {};
    this.actions = {};
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
    const { accountGroup, userName } = query;
    const accountGroups = this.accounts[userName];
    return accountGroups ? accountGroups[accountGroup] : undefined;
  }

  getAccountGroups(query) {
    const { userName } = query;
    return this.accounts[userName] || {};
  }

  updateAccountItem(updateObj) {
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

    return theAccount;
  }

  // *********************
  // Account category support
  addCategoryItem(item) {
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

  getCategories(query) {
    const { month, userName, year } = query;
    const rval = {};
    const categoryGroups = this.categories[userName];
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

    return theCategory;
  }

  // *********************
  // Action support
  addAction(actionObj) {
    const { action, year, month } = actionObj;
    const { userName } = action;
    const key = `${userName}-${year}-${month}`;
    let actions = this.actions[key];
    if (!actions) {
      this.actions[key] = [];
      actions = this.actions[key];
    }
    actions.unshift(action);
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
  registerUser(userObj) {
    const { userName } = userObj;
    if (!this.accounts[userName]) {
      this.accounts[userName] = {};
      this.actions[userName] = [];
      this.categories[userName] = {};
    }
  }
}

const inMemoryPersister = new InMemoryPersister();
export default inMemoryPersister;
