import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import helpScreenList from './helpScreenList';
import helpScreenMap from './helpScreenMap';
import './help.css';

const itemTemplate = (screenNum) => {
  return helpScreenMap[screenNum];
};

const HelpOverlay = () => {
  const [height, setHeight] = useState(300);
  const parentRef = useRef(null);
  useEffect(() => {
    if (parentRef.current) {
      const parHeight = parentRef.current.offsetHeight;
      setHeight(parHeight - 120);
    }
  }, [parentRef]);

  return (
    <div className="helpoverlay-container card" ref={parentRef}>
      <Carousel
        style={{ margin: '0px' }}
        value={helpScreenList}
        numVisible={1}
        numScroll={1}
        orientation="vertical"
        verticalViewPortHeight={`${height}px`}
        itemTemplate={itemTemplate}
      />
    </div>
  );
};

export default HelpOverlay;
