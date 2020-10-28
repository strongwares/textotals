import React from 'react';
import './help.css';

const HelpOverlay = ({ tabNumber }) => (
  <div
    className="helpoverlay-container"
    style={{
      height: '100%',
      width: '100%',
    }}
  >
    <h1>{`Hello help for tab ${tabNumber}`}</h1>
  </div>
);

export default HelpOverlay;
