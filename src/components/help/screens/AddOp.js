import React from 'react';
import './helpscreen.css';

const AddOp = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'The Add Operation'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Use the "add" action to tell Textotals to add an amount to one of your
      accounts.
    </h4>

    <h4 className="p-mt-0 p-mb-3">Here are examples of add actions:</h4>

    <div>
      <div className="action-item-action">add 500</div>
      <div className="action-item-action">add 500 savings</div>
      <div className="action-item-action">contract x add 500 account a</div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default AddOp;
