import React from 'react';
import HelpOverlay from '../help/HelpOverlay';
import './overlay.css';

const Overlay = ({ what }) => {
  let TheOverlay;

  if (what === 'help') {
    TheOverlay = HelpOverlay;
  }

  return (
    <div className="overlay-container">
      <TheOverlay />
    </div>
  );
};

export default Overlay;
