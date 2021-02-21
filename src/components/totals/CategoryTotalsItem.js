import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './totals.css';

const CategoryTotalsItem = ({ groupName, item, onTimelineClick }) => {
  const renderHeader = (group, label, onClick, op) => {
    return (
      <div className="categorytotals-table-header">
        {label}
        <span>
          Timeline:&nbsp;&nbsp;
          <i
            title={`Show ${op} timeline`}
            className="pi pi-clock categorytotals-table-header-icon"
            onClick={() => onClick({ type: 'totalstimeline', group, op })}
          />
        </span>
      </div>
    );
  };

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

  if (spendingCats.length <= 0 && givingCats.length <= 0) {
    return null;
  }

  return (
    <div className="categorytotals-item card p-shadow-5">
      <span>{groupName}</span>
      {spendingCats.length > 0 && (
        <DataTable
          className="p-datatable-striped p-datatable-gridlines"
          header={renderHeader(
            groupName,
            'Spending Totals',
            onTimelineClick,
            'spend'
          )}
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
          header={renderHeader(
            groupName,
            'Giving Totals',
            onTimelineClick,
            'give'
          )}
          value={givingCats}
        >
          <Column field="category" header="Category" sortable></Column>
          <Column field="total" header="Total" sortable></Column>
        </DataTable>
      )}
    </div>
  );
};

CategoryTotalsItem.propTypes = {
  groupName: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onTimelineClick: PropTypes.func.isRequired,
};

export default CategoryTotalsItem;
