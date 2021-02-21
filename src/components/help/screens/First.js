import React from 'react';
import * as C from '../../../constants';
import './helpscreen.css';

const First = () => {
  return (
    <div className="helpscreen-item">
      <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
        {`You can start using ${C.APP_NAME} immediately.`}
      </h3>

      <div style={{ marginTop: '-15px', textAlign: 'center' }}>
        <h4 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
          There's nothing to download or install.
        </h4>
      </div>

      <div style={{ marginTop: '-15px', textAlign: 'center' }}>
        <h5 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
          {C.APP_HELP_EMAIL}
        </h5>
      </div>

      <h4 className="p-mt-0 p-mb-3">
        {C.APP_NAME} only has three tabs: Action, Accounts, Totals.
      </h4>

      <h4 className="p-mt-0 p-mb-3">The Action tab is where you start.</h4>

      <h4 className="p-mt-0 p-mb-3">
        In that tab you enter an action in the text input field at the bottom.
      </h4>

      <h4 className="p-mt-0 p-mb-3">
        You can also enter 'help' to display these help screens.
      </h4>

      <h4 className="p-mt-0 p-mb-3">
        In the Actions tab, type in an action, then hit the 'enter' key or click
        the round 'plus' button.
      </h4>

      <h4 className="p-mt-0 p-mb-3">
        Actions you would enter are things like:
      </h4>

      <div style={{ marginTop: '-15px', textAlign: 'center' }}>
        <h5 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
          set 500
        </h5>
      </div>

      <div style={{ marginTop: '-15px', textAlign: 'center' }}>
        <h5 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
          spend 20.59 on food
        </h5>
      </div>

      <div style={{ marginTop: '-15px', textAlign: 'center' }}>
        <h5 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
          spend 41.22 on gas
        </h5>
      </div>

      <div id="spacer" style={{ flex: 1 }} />
    </div>
  );
};

export default First;
