import React from 'react';
import './helpscreen.css';

const SpendOp = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'The Spend Action'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Text "spend" to tell Textotals that you've spent something from one of
      your accounts.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Here are examples of spend actions you could enter:
    </h4>

    <div style={{ marginLeft: '20px' }}>
      <div className="action-item-action">spend 19.19 on gas</div>
      <div className="action-item-action">spend 10.99 from savings</div>
    </div>
  </div>
);

export default SpendOp;
