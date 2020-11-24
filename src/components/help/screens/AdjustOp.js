import React from 'react';
import './helpscreen.css';

const AdjustOp = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'The "adjust" Operation'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Text "adjust" to tell Textotals that you need to adjust the total amount
      that is in one of your accounts.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      The adjust operation adds or subtracts an amount from a specified account.
    </h4>

    <h4 className="p-mt-0 p-mb-3">Here are examples of adjust actions:</h4>

    <div>
      <div className="action-item-action">adjust -0.99</div>
      <div className="action-item-action">adjust 50.99 savings</div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default AdjustOp;
