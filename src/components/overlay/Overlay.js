import React from 'react';
import HelpOverlay from '../help/HelpOverlay';
import './overlay.css';

const Overlay = ({ isMobileLandscape, what }) => {
  let TheOverlay;

  if (what === 'help') {
    TheOverlay = HelpOverlay;
  }

  return (
    <div className="overlay-container">
      <TheOverlay isMobileLandscape={isMobileLandscape} />
    </div>
  );
};

export default Overlay;
