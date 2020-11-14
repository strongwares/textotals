import React from 'react';
import ActionItem from '../../actions/ActionItem';
import './helpscreen.css';

// <div className="fake-input-arrow animate__animated animate__bounceInDown" />

const NotReallyTexting = (
  <div className="helpscreen-item">
    <h2 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Not Really Texting
    </h2>
    <h4 className="p-mt-0 p-mb-3">
      Its not really a text, it only goes to the Textotals app's little brain.
    </h4>
    <h4 className="p-mt-0 p-mb-3">
      It figures out your account totals and texts them back like this:
    </h4>

    <div id="spacer" style={{ flex: 1 }} />

    <ActionItem
      action={{
        actionStr: 'set 500::PERSONAL MAIN 500.00',
        timestampMs: new Date().getTime() - 100000000,
      }}
    />

    <ActionItem
      action={{
        actionStr: 'spend 19.95 on gas::PERSONAL MAIN 480.05',
        timestampMs: new Date().getTime(),
      }}
    />
  </div>
);

export default NotReallyTexting;
