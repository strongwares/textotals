import React, { useEffect, useState } from 'react';
import { getAccountGroups } from '../../lib/action/persistenceUtils';
import AccountGroupItem from './AccountGroupItem';
import './accounts.css';

const AccountsContainer = ({ user, onHelp }) => {
  const [accountGroups, setAccountGroups] = useState({});
  useEffect(() => {
    setAccountGroups(getAccountGroups({ userName: user.userName }));
  }, [user]);

  const accountGroupList = Object.keys(accountGroups).map((name) => {
    return (
      <AccountGroupItem
        key={name}
        groupName={name}
        item={accountGroups[name]}
      />
    );
  });

  return (
    <div className="accounts-container">
      <div className="p-grid p-dir-col">{accountGroupList}</div>
      <div id="bottomSpacer" style={{ flex: 1 }} />
    </div>
  );
};

export default AccountsContainer;
