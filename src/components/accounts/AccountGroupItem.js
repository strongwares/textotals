import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './accounts.css';

const AccountGroupItem = ({ groupName, item }) => {
  const accounts = Object.keys(item)
    .sort()
    .reduce((list, accountName) => {
      list.push({
        accountName,
        total: (item[accountName].total / 100).toFixed(2),
      });
      return list;
    }, []);

  return (
    <div className="accountgroup-item card p-shadow-5">
      <span>{`Account Group: ${groupName}`}</span>
      <DataTable
        className="p-datatable-striped p-datatable-gridlines"
        header="Account Totals"
        value={accounts}
      >
        <Column field="accountName" header="Account" sortable></Column>
        <Column field="total" header="Total" sortable></Column>
      </DataTable>
    </div>
  );
};

AccountGroupItem.propTypes = {
  groupName: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default AccountGroupItem;
