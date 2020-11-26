import React from 'react';
import { Button } from 'primereact/button';
import * as C from '../../constants';
import './premium.css';

const RegisterForm = ({ onClose }) => {
  return (
    <div className="registerform-container">
      <div style={{ margin: '20px 0px 0px 0px' }} className="p-grid p-fluid">
        <div className="p-col-12 p-md-12">
          <div className="p-inputgroup unregisterform-inputgroup">
            <h2>{C.PREMIUM_BUTTON_TEXT} coming soon!!</h2>
          </div>

          <Button
            className="p-button-rounded"
            icon="pi pi-arrow-left"
            onClick={onClose}
            style={{ marginTop: '10px', maxWidth: '100px' }}
          />
        </div>
      </div>
      <div id="bottomSpacer" style={{ flex: 1 }} />
    </div>
  );
};

export default RegisterForm;
