import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import './helpscreen.css';

const renderHeader = (label, op) => {
  return (
    <div className="mycategorytotals-table-header">
      {label}
      <span>
        Timeline:&nbsp;&nbsp;
        <i
          title={`Show ${op} timeline`}
          className="pi pi-clock mycategorytotals-table-header-icon"
        />
      </span>
    </div>
  );
};

const Third = () => {
  return (
    <div className="helpscreen-item">
      <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
        Category Totals
      </h3>

      <div style={{ marginTop: '-10px' }}>
        <h4 className="p-mt-0 p-mb-3">
          The Totals tab shows the total amount spent in each category for a
          given account group.
        </h4>
      </div>

      <div style={{ marginTop: '-10px' }}>
        <h4 className="p-mt-0 p-mb-3">
          You can click on the 'Timeline' clock icon to display a timeline
          showing the exact times an amount was spent.
        </h4>
      </div>

      <div
        style={{ marginTop: '-5px' }}
        className="mycategorytotals-item card p-shadow-5"
      >
        <span>PERSONAL</span>
        <DataTable
          className="p-datatable-striped p-datatable-gridlines"
          header={renderHeader('Spending Totals', 'Spend')}
          value={[
            { category: 'FOOD', total: '20.59' },
            { category: 'GAS', total: '41.22' },
          ]}
        >
          <Column field="category" header="Category" sortable></Column>
          <Column field="total" header="Total" sortable></Column>
        </DataTable>
      </div>

      <div id="spacer" style={{ flex: 1 }} />
    </div>
  );
};

export default Third;
