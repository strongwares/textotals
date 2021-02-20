import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'primereact/carousel';
import helpScreenList from './helpScreenList';
import helpScreenMap from './helpScreenMap';
import './help.css';

// Extening Carousel just to disable the
// carousel changing pages on swipe since
// The problem was that some Carousel pages have a
// vertical scroll bar. When the content was
// swiped to scroll vertically, then the
// Carousel would change pages out from
// under you.
class MyCarousel extends Carousel {
  changePageOnTouch(e, diff) {
    // super.changePageOnTouch(e, diff);
    // console.log('MyCarousel changePageOnTouch');
  }
}

const itemTemplate = (screenNum) => {
  return helpScreenMap[screenNum];
};

const HelpOverlay = ({ isMobileLandscape }) => {
  const [height, setHeight] = useState(300);
  const parentRef = useRef(null);
  useEffect(() => {
    if (parentRef.current) {
      const parHeight = parentRef.current.offsetHeight;
      if (isMobileLandscape) {
        setHeight(parHeight);
      } else {
        setHeight(parHeight - 120);
      }
    }
  }, [parentRef, isMobileLandscape]);

  // TODO: Make it controlled and abort the event
  // page={this.state.page} onPageChange={(e) => this.setState({page: e.page})}

  const orientation = isMobileLandscape ? 'horizontal' : 'vertical';

  return (
    <div className="helpoverlay-container card" ref={parentRef}>
      <MyCarousel
        style={{ margin: '0px' }}
        value={helpScreenList}
        numVisible={1}
        numScroll={1}
        orientation={orientation}
        verticalViewPortHeight={`${height}px`}
        itemTemplate={itemTemplate}
      />
    </div>
  );
};

HelpOverlay.propTypes = {
  isMobileLandscape: PropTypes.bool,
};

HelpOverlay.defaultProps = {
  isMobileLandscape: false,
};

export default HelpOverlay;
