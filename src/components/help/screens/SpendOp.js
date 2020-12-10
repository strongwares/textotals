import React from 'react';
import './helpscreen.css';

const SpendOp = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'The Spend Action'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Use the "spend" action to tell Textotals that you've spent something from
      one of your accounts.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Here are examples of spend actions you could enter:
    </h4>

    <div style={{ marginLeft: '20px' }}>
      <div className="action-item-action">spend 19.19 on gas</div>
      <div className="action-item-action">spend 10.99 from savings</div>
      <div className="action-item-action">
        special group spend 1000 on special stuff from special account
      </div>
    </div>

    <h4 className="p-mt-0 p-mb-3">
      Hint: to undo a previous spend action, simply re-enter the same action but
      with a negative amount, like this:
    </h4>

    <div style={{ marginLeft: '20px' }}>
      <div className="action-item-action">spend 409.99 on gas</div>
      <span>Hmmmm, I entered the wrong spend amount, need to undo it:</span>
      <div className="action-item-action">spend -409.99 on gas</div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default SpendOp;
