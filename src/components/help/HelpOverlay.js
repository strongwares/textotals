import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import helpScreenList from './helpScreenList';
import helpScreenMap from './helpScreenMap';
import './help.css';

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
  }, [parentRef]);

  // TODO: Make it controlled and abort the event
  // page={this.state.page} onPageChange={(e) => this.setState({page: e.page})}

  const orientation = isMobileLandscape ? 'horizontal' : 'vertical';

  return (
    <div className="helpoverlay-container card" ref={parentRef}>
      <Carousel
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

export default HelpOverlay;
