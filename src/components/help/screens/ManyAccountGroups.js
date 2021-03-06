import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const ManyAccountGroups = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Many Account Groups
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      {C.APP_NAME} can keep track of accounts in many different groups.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      All you have to do is enter a group name as the first word(s) of the
      action.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Here are examples of actions with group names.
    </h4>

    <div style={{ marginLeft: '20px' }}>
      <div className="action-item-action">drawer set 500</div>
      <div className="action-item-action">home school set 500</div>
      <div className="action-item-action">credit union set 500 main</div>
      <div className="action-item-action">contract x set 500 account a</div>
      <div className="action-item-action">
        special group set 5000 special account
      </div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default ManyAccountGroups;
