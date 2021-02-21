import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import './helpscreen.css';

const Second = () => {
  return (
    <div className="helpscreen-item">
      <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
        Account Totals
      </h3>

      <div style={{ marginTop: '-10px' }}>
        <h4 className="p-mt-0 p-mb-3">
          The Accounts tab shows the current total amount in each account for a
          given group of accounts:
        </h4>
      </div>

      <div
        style={{ marginTop: '-5px' }}
        className="myaccountgroup-item card p-shadow-5"
      >
        <span>PERSONAL</span>
        <DataTable
          className="p-datatable-striped p-datatable-gridlines"
          header="Account Totals"
          value={[
            { accountName: 'SAVINGS', total: '1500.00' },
            { accountName: 'MAIN', total: '438.19' },
          ]}
        >
          <Column field="accountName" header="Account" sortable></Column>
          <Column field="total" header="Total" sortable></Column>
        </DataTable>
      </div>

      <div id="spacer" style={{ flex: 1 }} />
    </div>
  );
};

export default Second;
