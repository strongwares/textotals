import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const Storage = (
  <div className="helpscreen-item">
    <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      {'Only Local Storage'}
    </h3>

    <h4 className="p-mt-0 p-mb-3">
      {C.APP_NAME} only stores info in the local storage on this device, nothing
      is stored anywhere else.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      Only one month's worth of actions will be stored. Well, actually{' '}
      {C.APP_NAME} will also store the actions from the last week of the
      previous month to provide some continuity.
    </h4>

    <h4 className="p-mt-0 p-mb-3">
      The user name, email, and password only live on this device you are logged
      in to right now.
    </h4>

    <div id="spacer" style={{ flex: 1 }} />
  </div>
);

export default Storage;
