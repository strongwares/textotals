import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const ClearOp = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'The Clear Action'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Use the "clear" action to tell {C.APP_NAME} that you want to remove all
      actions, accounts, and totals from one account group.
    </h4>

    <h4 className="p-mt-0 p-mb-3">Here are examples of "clear" actions:</h4>

    <div>
      <div className="action-item-action">clear</div>
      <h4 className="p-mt-0 p-mb-3">Which is the same action as:</h4>
      <div className="action-item-action">personal clear</div>
      <h4 className="p-mt-0 p-mb-3">
        If you want to clear another account group:
      </h4>
      <div className="action-item-action">contract x clear</div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default ClearOp;
