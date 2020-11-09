import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getCategories } from '../../lib/action/persistenceUtils';
import CategoryTotalsItem from './CategoryTotalsItem';
import './totals.css';

const utcdayjs = dayjs.extend(utc);

const TotalsContainer = ({ user, onHelp }) => {
  const [accountGroups, setAccountGroups] = useState({});
  useEffect(() => {
    const theTime = utcdayjs.utc();
    const year = theTime.format('YYYY');
    const month = theTime.format('MMM');
    setAccountGroups(getCategories({ month, userName: user.userName, year }));
  }, [user]);

  const accountGroupList = Object.keys(accountGroups).map((name) => {
    return (
      <CategoryTotalsItem
        key={name}
        groupName={name}
        item={accountGroups[name]}
      />
    );
  });

  return (
    <div className="totals-container">
      <div className="p-grid p-dir-col">{accountGroupList}</div>
      <div id="bottomSpacer" style={{ flex: 1 }} />
    </div>
  );
};

export default TotalsContainer;
