import React, { useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import VizSensor from 'react-visibility-sensor';
import 'animate.css/animate.min.css';
import './helpscreen.css';

// Using VizSensor since this guy is a screen in the help
// carousel that gets rendered immediately when the carousel
// is loaded. But we want to run animation effect only when
// it is visible.
const Second = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <VizSensor
      onChange={(visible) => {
        setIsVisible(visible);
      }}
    >
      <div className="helpscreen-item">
        <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
          Second
        </h3>

        <div style={{ marginTop: '-5px' }}>
          <h4 className="p-mt-0 p-mb-3">
            The Accounts tab shows each account total:
          </h4>
        </div>

        <div
          style={{ marginTop: '-10px' }}
          className="myaccountgroup-item card p-shadow-5"
        >
          <span>PERSONAL</span>
          <DataTable
            className="p-datatable-striped p-datatable-gridlines"
            header="Account Totals"
            value={[{ accountName: 'MAIN', total: '500.00' }]}
          >
            <Column field="accountName" header="Account" sortable></Column>
            <Column field="total" header="Total" sortable></Column>
          </DataTable>
        </div>

        {isVisible && (
          <div
            style={{ textAlign: 'center', marginBottom: '0px' }}
            className="animate__animated animate__bounceInUp"
          >
            <i
              className="pi pi-arrow-up"
              style={{ color: '#444cf7', fontSize: '5em' }}
            ></i>
          </div>
        )}

        <div id="spacer" style={{ flex: 1 }} />
      </div>
    </VizSensor>
  );
};

export default Second;
