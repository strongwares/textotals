import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  getAccountGroups,
  getCategories,
} from '../../lib/action/persistenceUtils';
import AccountGroupItem from './AccountGroupItem';
import './accounts.css';

const utcdayjs = dayjs.extend(utc);

const AccountsContainer = ({ user, onHelp }) => {
  const [accounts, setAccounts] = useState({});
  const [categories, setCategories] = useState({});
  useEffect(() => {
    const theTime = utcdayjs.utc();
    const year = theTime.format('YYYY');
    const month = theTime.format('MMM');
    const accts = getAccountGroups({ userName: user.userName });
    setAccounts(accts);

    const cats = getCategories({ month, userName: user.userName, year });
    setCategories(cats);
  }, [user]);

  const accountList = Object.keys(accounts).map((name) => {
    return (
      <AccountGroupItem
        key={name}
        groupName={name}
        accountsItem={accounts[name]}
        categoriesItem={categories[name]}
      />
    );
  });

  return (
    <div className="accounts-container">
      <div className="p-grid p-dir-col">{accountList}</div>
      <div id="bottomSpacer" style={{ flex: 1 }} />
    </div>
  );
};

export default AccountsContainer;
