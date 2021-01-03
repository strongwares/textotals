import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import * as C from '../../constants';
import './premium.css';

const PremiumForm = ({ onClose }) => {
  return (
    <div className="premiumform-container">
      <div
        style={{ width: '100%', margin: '20px 0px 0px 0px' }}
        className="p-grid p-fluid"
      >
        <div className="p-col-12 p-md-12">
          <div className="p-inputgroup premiumform-inputgroup">
            <h2>{C.PREMIUM_BUTTON_TEXT} coming soon!</h2>
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

PremiumForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PremiumForm;
