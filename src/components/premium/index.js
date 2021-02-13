import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import * as C from '../../constants';
import './premium.css';

// <div className="p-inputgroup premiumform-inputgroup">
// input group labels
// </div>

const PremiumForm = ({ onClose }) => {
  return (
    <div className="premiumform-container">
      <div
        style={{ width: '100%', margin: '20px 0px 0px 0px' }}
        className="p-grid p-fluid"
      >
        <div className="p-col-12 p-md-12">
          <h2>{C.PREMIUM_BUTTON_TEXT} coming soon!</h2>

          <h3>A {C.PREMIUM_BUTTON_TEXT} account would include:</h3>

          <h4 className="p-mt-0 p-mb-3">
            All of your actions being saved, not just one month's worth.
          </h4>

          <h4 className="p-mt-0 p-mb-3">
            Your data being stored on the IPFS (InterPlanitaryFileSystem), where
            you are able to access it yourself, instead of your actions being
            visible only on this device through this application.
          </h4>

          <h4 className="p-mt-0 p-mb-3">
            Access to a "link" action, that allows two user's accounts to be
            linked, like a joint checking account.
          </h4>

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
