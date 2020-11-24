import React from 'react';
import ActionItem from '../../actions/ActionItem';
import './helpscreen.css';

// <div className="fake-input-arrow animate__animated animate__bounceInDown" />

const TheBrain = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      Textotals Brain
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      When you enter an action, Textotals automatically updates each account's
      total.
    </h4>

    <h4 astyle={{ marginTop: '-10px' }} className="p-mt-0 p-mb-3">
      Then it acts like it texts the totals back to you.
    </h4>

    <h4
      astyle={{ marginTop: '-10px', marginBottom: '-30px' }}
      className="p-mt-0 p-mb-3"
    >
      That looks something like this:
    </h4>

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

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default TheBrain;
