import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
// import HelpOverlay from '../help/HelpOverlay';
import './overlay.css';

const HelpComponent = React.lazy(() => import('../help/HelpOverlay'));

// <TheOverlay isMobileLandscape={isMobileLandscape} />

const Overlay = ({ isMobileLandscape, what }) => {
  let TheOverlay;

  if (what === 'help') {
    TheOverlay = HelpComponent;
  }

  return (
    <div className="overlay-container">
      <Suspense fallback={<div>Loading...</div>}>
        <TheOverlay isMobileLandscape={isMobileLandscape} />
      </Suspense>
    </div>
  );
};

Overlay.propTypes = {
  isMobileLandscape: PropTypes.bool,
  what: PropTypes.string,
};

Overlay.defaultProps = {
  isMobileLandscape: false,
  what: 'help',
};

export default Overlay;
