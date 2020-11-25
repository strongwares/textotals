import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import './helpscreen.css';

const Third = () => {
  return (
    <div className="helpscreen-item">
      <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
        Category Totals
      </h3>

      <div style={{ marginTop: '-10px' }}>
        <h4 className="p-mt-0 p-mb-3">
          The Totals tab shows the total amount spent in each category.
        </h4>
      </div>

      <div
        style={{ marginTop: '-5px' }}
        className="mycategorytotals-item card p-shadow-5"
      >
        <span>PERSONAL</span>
        <DataTable
          className="p-datatable-striped p-datatable-gridlines"
          header="Spending Totals"
          value={[
            { category: 'GAS', total: '149.04' },
            { category: 'GROCERIES', total: '366.25' },
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
