import React from 'react';
import './helpscreen.css';

const ManyAccountGroups = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Many Account Groups
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Textotals can keep track of accounts in many different groups.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      All you have to do is enter a group name as the first word(s) of the
      action.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Here are examples of actions with group names.
    </h4>

    <div style={{ marginLeft: '20px' }}>
      <div className="action-item-action">BOA set 500</div>
      <div className="action-item-action">credit union set 500 main</div>
      <div className="action-item-action">contract x set 500 account a</div>
      <div className="action-item-action">contract x set 500 account b</div>
      <div className="action-item-action">home school set 500</div>
    </div>
  </div>
);

export default ManyAccountGroups;
