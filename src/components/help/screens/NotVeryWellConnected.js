import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const NotVeryWellConnected = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'Not Very Well Connected'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      {C.APP_NAME} is not very well connected right now.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      It doesn't actually talk to a bank or any other kind of service.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      But it is your personal budget tracking and time management playground!
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      It doesn't send your user name, email, or password anywhere.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      But you can register several user names on this device if you wanted to.
      The passwords are checked only within {C.APP_NAME} on this device,
      passwords are not sent anywhere else.
    </h4>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default NotVeryWellConnected;
