import React from 'react';
import HelpOverlay from '../help/HelpOverlay';
import './overlay.css';

const Overlay = ({ what }) => {
  let TheOverlay;

  if (what === 'help') {
    TheOverlay = HelpOverlay;
  }

  return (
    <div
      className="overlay-container"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <TheOverlay />
    </div>
  );
};

export default Overlay;
