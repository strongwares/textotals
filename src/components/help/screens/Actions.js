import React from 'react';
import './helpscreen.css';

const Actions = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Actions
    </h3>
    <h4 className="p-mt-0 p-mb-3">Textotals handles these actions:</h4>

    <div className="action-li">
      <div className="action-li-name">set:&nbsp;</div>
      <div className="action-li-descr">
        like opening an account, sets the starting amount
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">spend:&nbsp;</div>
      <div className="action-li-descr">
        like buying groceries, pull an amount from an account
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">add:&nbsp;</div>
      <div className="action-li-descr">
        like a deposit, increases the amount in an account
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">move:&nbsp;</div>
      <div className="action-li-descr">
        like a transfer, move an amount from one account to another
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">adjust:&nbsp;</div>
      <div className="action-li-descr">
        like a correction, add or remove an amount from an account
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">give:&nbsp;</div>
      <div className="action-li-descr">
        like spending, you give an mount to some charity
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default Actions;
