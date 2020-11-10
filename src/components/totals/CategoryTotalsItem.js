import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './totals.css';

const CategoryTotalsItem = ({ groupName, item }) => {
  const spendingCats = Object.keys(item.spend)
    .sort()
    .reduce((list, category) => {
      list.push({
        category,
        total: (item.spend[category].total / 100).toFixed(2),
      });
      return list;
    }, []);

  const givingCats = Object.keys(item.give)
    .sort()
    .reduce((list, category) => {
      list.push({
        category,
        total: (item.give[category].total / 100).toFixed(2),
      });
      return list;
    }, []);

  return (
    <div className="categorytotals-item card p-shadow-5">
      <span>{groupName}</span>
      {spendingCats.length > 0 && (
        <DataTable
          className="p-datatable-striped p-datatable-gridlines"
          header="Spending Totals"
          value={spendingCats}
        >
          <Column field="category" header="Category" sortable></Column>
          <Column field="total" header="Total" sortable></Column>
        </DataTable>
      )}
      {givingCats.length > 0 && (
        <DataTable
          style={{ marginTop: '10px' }}
          className="p-datatable-striped p-datatable-gridlines"
          header="Giving Totals"
          value={givingCats}
        >
          <Column field="category" header="Category" sortable></Column>
          <Column field="total" header="Total" sortable></Column>
        </DataTable>
      )}
    </div>
  );
};

export default CategoryTotalsItem;
