import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const Actions = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Actions
    </h3>
    <h4 className="p-mt-0 p-mb-3">{C.APP_NAME} handles these actions:</h4>

    <div className="action-li">
      <div className="action-li-name">set:&nbsp;</div>
      <div className="action-li-descr">
        like opening an account, you set the starting total
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">spend:&nbsp;</div>
      <div className="action-li-descr">
        like buying groceries, you pull an amount out of an account
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">add:&nbsp;</div>
      <div className="action-li-descr">
        like a deposit, you increase the amount in an account
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">move:&nbsp;</div>
      <div className="action-li-descr">
        like a transfer, you move an amount from one account to another
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">adjust:&nbsp;</div>
      <div className="action-li-descr">
        like a correction or a fee, you add or remove an amount from an account
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">give:&nbsp;</div>
      <div className="action-li-descr">
        like spending, but you give an amount to charity
      </div>
    </div>

    <div className="action-li">
      <div className="action-li-name">clear:&nbsp;</div>
      <div className="action-li-descr">
        wipes the slate clean, removes all data
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default Actions;
