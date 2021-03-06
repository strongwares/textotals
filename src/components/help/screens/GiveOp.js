import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const GiveOp = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'The Give Action'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Use the "give" action to tell {C.APP_NAME} that you've given an amount to
      a charity.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      {C.APP_NAME} keeps track of charitable giving separately from other
      categories that you spend on.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      It will automatically use a category named "CHARITY" if you don't include
      a charity name in an action.
    </h4>

    <h4 className="p-mt-0 p-mb-3">Here are examples of give actions:</h4>

    <div>
      <div className="action-item-action">give 500</div>
      <div className="action-item-action">give 500 to homeless</div>
      <div className="action-item-action">
        give 500 to charity x from savings
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default GiveOp;
