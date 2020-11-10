import React, { useEffect, useState } from 'react';
import { getAccountGroups } from '../../lib/action/persistenceUtils';
import AccountGroupItem from './AccountGroupItem';
import './accounts.css';

const AccountsContainer = ({ user, onHelp }) => {
  const [accounts, setAccounts] = useState({});
  useEffect(() => {
    const accts = getAccountGroups({ userName: user.userName });
    setAccounts(accts);
  }, [user]);

  const accountList = Object.keys(accounts).map((name) => {
    return (
      <AccountGroupItem key={name} groupName={name} item={accounts[name]} />
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
