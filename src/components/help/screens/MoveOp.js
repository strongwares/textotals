import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const MoveOp = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'The Move Action'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Use the "move" action to tell {C.APP_NAME} that you want to transfer an
      amount from one account to another.
    </h4>

    <h4 className="p-mt-0 p-mb-3">Here are examples of move actions:</h4>

    <div>
      <div className="action-item-action">move 100 from main to savings</div>
      <div className="action-item-action">
        contract x move 299 from account a to account b
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default MoveOp;
