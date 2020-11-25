import React from 'react';
import './helpscreen.css';

/*
    <h4 className="p-mt-0 p-mb-3">
      All you have to do is enter an account name after the number in your
      action.
    </h4>

*/

const ManyAccountNames = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Many Account Names
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Textotals can also remember lots of account names.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Here are examples of "set" actions with account names.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      These actions set the specified account's total to the given number:
    </h4>

    <div style={{ marginLeft: '20px' }}>
      <div className="action-item-action">set 500 accountX</div>
      <div className="action-item-action">set 500 family savings</div>
      <div className="action-item-action">set 500 another great account</div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default ManyAccountNames;
