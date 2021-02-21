import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import './overlay.css';

const HelpComponent = React.lazy(() => import('../help/HelpOverlay'));

const TotalsTimeline = React.lazy(() => import('../totals/TotalsTimeline'));

const Overlay = ({ isMobileLandscape, item, user }) => {
  const { type } = item;
  let TheOverlay;
  if (type === 'help') {
    TheOverlay = HelpComponent;
  } else if (type === 'totalstimeline') {
    TheOverlay = TotalsTimeline;
  } else {
    TheOverlay = () => <div>{`Unsupported overlay: ${type}`}</div>;
  }

  return (
    <div className="overlay-container">
      <Suspense fallback={<div>Loading...</div>}>
        <TheOverlay
          isMobileLandscape={isMobileLandscape}
          user={user}
          {...item}
        />
      </Suspense>
    </div>
  );
};

Overlay.propTypes = {
  isMobileLandscape: PropTypes.bool,
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

Overlay.defaultProps = {
  isMobileLandscape: false,
};

export default Overlay;
