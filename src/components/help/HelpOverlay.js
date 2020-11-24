import React from 'react';
import { Carousel } from 'primereact/carousel';
import helpScreenList from './helpScreenList';
import helpScreenMap from './helpScreenMap';
import './help.css';

const itemTemplate = (screenNum) => {
  return helpScreenMap[screenNum];
};

const HelpOverlay = () => (
  <div className="helpoverlay-container card">
    <Carousel
      style={{ margin: '0px' }}
      value={helpScreenList}
      numVisible={1}
      numScroll={1}
      orientation="vertical"
      verticalViewPortHeight="370px"
      itemTemplate={itemTemplate}
    />
  </div>
);

export default HelpOverlay;
