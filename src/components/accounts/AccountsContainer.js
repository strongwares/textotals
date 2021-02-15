import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAccountGroups } from '../../lib/action/persistenceUtils';
import AccountGroupItem from './AccountGroupItem';
import './accounts.css';

const AccountsContainer = ({ user }) => {
  const [accounts, setAccounts] = useState({});
  useEffect(() => {
    const accts = getAccountGroups({ userName: user.userName });
    setAccounts(accts);
  }, [user]);

  const accountList = Object.keys(accounts).map((name) => {
    const item = accounts[name];
    let hasAccount = false;
    let aTotal;
    Object.keys(item).forEach((accountName) => {
      aTotal = item[accountName].total;
      if (typeof aTotal !== 'undefined') {
        hasAccount = true;
      }
    });

    if (!hasAccount) {
      return null;
    }
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

AccountsContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AccountsContainer;
