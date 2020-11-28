import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const First = () => {
  return (
    <div className="helpscreen-item">
      <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
        {`${C.APP_NAME} has three tabs:`}
      </h3>

      <div style={{ marginTop: '-15px', textAlign: 'center' }}>
        <h4 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
          Action, Accounts, and Totals
        </h4>
      </div>

      <h4 className="p-mt-0 p-mb-3">
        The Action tab is where you enter an action in the text input field at
        the bottom of the screen.
      </h4>

      <h4 className="p-mt-0 p-mb-3">
        You can also enter 'help' to display these help screens again.
      </h4>

      <h4 className="p-mt-0 p-mb-3">
        Then hit the 'Enter' key or click the round 'plus' button.
      </h4>

      <div id="spacer" style={{ flex: 1 }} />
    </div>
  );
};

export default First;
