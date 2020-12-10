import React from 'react';
import './helpscreen.css';

const SetOp = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'The Set Action'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      First you should set the starting total for your main account.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      You also use the "set" action to set the starting total for any another account
      you want to keep track of.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Here are examples of set actions you could enter:
    </h4>

    <div style={{ marginLeft: '20px' }}>
      <div className="action-item-action">set 500</div>
      <div className="action-item-action">set 1000 savings</div>
      <div className="action-item-action">
        special group set 50000 special account
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default SetOp;
