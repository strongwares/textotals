import React from 'react';
import './helpscreen.css';

const NotVeryWellConnected = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'Not Very Well Connected'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      This Textotals application is not very well connected right now.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      It doesn't actually talk to a bank or any other kind of service.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      But it is your personal budget tracking and time management playground!
    </h4>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default NotVeryWellConnected;
