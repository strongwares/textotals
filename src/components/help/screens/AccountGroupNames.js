import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const AccountGroupNames = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Account Group Names
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      {C.APP_NAME} automatically keeps track of a group that every account
      belongs to.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      {C.APP_NAME} likes to call that automatic account group name "PERSONAL".
    </h4>

    <h4 className="p-mt-0 p-mb-3">So the action:</h4>
    <div
      style={{ marginTop: '-15px', marginBottom: '10px', marginLeft: '20px' }}
    >
      <div className="action-item-action">set 500</div>
    </div>

    <h4 className="p-mt-0 p-mb-3">is the same as if you had entered:</h4>

    <div
      style={{ marginTop: '-15px', marginBottom: '10px', marginLeft: '20px' }}
    >
      <div className="action-item-action">PERSONAL set 500 MAIN</div>
    </div>

    <h4 className="p-mt-0 p-mb-3">And this is also the same action:</h4>

    <div
      style={{ marginTop: '-15px', marginBottom: '10px', marginLeft: '20px' }}
    >
      <div className="action-item-action">personal set 500 main</div>
    </div>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default AccountGroupNames;
