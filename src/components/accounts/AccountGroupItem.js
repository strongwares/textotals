import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import './accounts.css';

const AccountGroupItem = ({ groupName, accountsItem, categoriesItem }) => {
  const accounts = Object.keys(accountsItem)
    .sort()
    .reduce((list, accountName) => {
      list.push({
        accountName,
        total: (accountsItem[accountName].total / 100).toFixed(2),
      });
      return list;
    }, []);

  let spendingCats;
  let givingCats;
  if (categoriesItem) {
    spendingCats = Object.keys(categoriesItem.spend)
      .sort()
      .reduce((list, category) => {
        list.push({
          category,
          total: (categoriesItem.spend[category].total / 100).toFixed(2),
        });
        return list;
      }, []);

    givingCats = Object.keys(categoriesItem.give)
      .sort()
      .reduce((list, category) => {
        list.push({
          category,
          total: (categoriesItem.give[category].total / 100).toFixed(2),
        });
        return list;
      }, []);
  }

  const showAccordion =
    categoriesItem &&
    ((spendingCats && spendingCats.length > 0) ||
      (givingCats && givingCats.length > 0));

  return (
    <div className="accountgroup-item card p-shadow-5">
      <span>{groupName}</span>
      <DataTable
        className="p-datatable-striped p-datatable-gridlines"
        header="Account Totals"
        value={accounts}
      >
        <Column field="accountName" header="Account" sortable></Column>
        <Column field="total" header="Total" sortable></Column>
      </DataTable>

      {spendingCats && spendingCats.length > 0 && (
        <Panel collapsed header="Spending Categories" toggleable>
          <DataTable
            className="p-datatable-striped p-datatable-gridlines"
            value={spendingCats}
          >
            <Column field="category" header="Category" sortable></Column>
            <Column field="total" header="Total" sortable></Column>
          </DataTable>
        </Panel>
      )}

      {givingCats && givingCats.length > 0 && (
        <Panel collapsed header="Giving Categories" toggleable>
          <DataTable
            header={undefined}
            className="p-datatable-striped p-datatable-gridlines"
            value={givingCats}
          >
            <Column field="category" header="Category" sortable></Column>
            <Column field="total" header="Total" sortable></Column>
          </DataTable>
        </Panel>
      )}
    </div>
  );
};

export default AccountGroupItem;
