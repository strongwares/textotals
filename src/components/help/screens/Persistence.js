import React from 'react';
import './helpscreen.css';

const Persistence = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'Only Local Storage'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      This Textotals only stores data in the local storage on this device.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      This just means that right now nothing you enter here is being stored
      anywhere else.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      It also means that any data you enter on one device will not be visible
      (yet) on any other device.
    </h4>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default Persistence;
