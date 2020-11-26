import React from 'react';
import './helpscreen.css';

const Persistence = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'Only Local Storage'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      Textotals only stores info in the local storage on this device, nothing is
      stored anywhere else.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Only one month's worth of actions will be stored. But Premium capabilities
      will change that!
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      The user name, email, and password only live on this device you're looking
      at right now.
    </h4>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default Persistence;
