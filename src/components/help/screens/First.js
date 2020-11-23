import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import VizSensor from 'react-visibility-sensor';
import './helpscreen.css';

// Using VizSensor since this guy is a screen in the help
// carousel that gets rendered immediately when the carousel
// is loaded. But we want to run animation effect only when
// it is visible.
const First = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <VizSensor
      onChange={(visible) => {
        setIsVisible(visible);
      }}
    >
      <div className="helpscreen-item">
        <h3 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
          First
        </h3>
        <h4 className="p-mt-0 p-mb-3">
          On the Action tab, enter an action in the bottom text box.
        </h4>

        <h4 className="p-mt-0 p-mb-3">
          Or you can enter 'help' to display the help panels again.
        </h4>

        <div style={{ marginLeft: '100px' }}>
          <h4 className="p-mt-0 p-mb-3">
            Then hit the 'Enter' key or click the round 'plus' Add button:
          </h4>
        </div>

        <div id="spacer" style={{ flex: 1 }} />

        {isVisible && (
          <div
            style={{ display: 'flex', flexDirection: 'row' }}
            className="animate__animated animate__bounceInDown"
          >
            <i
              className="pi pi-arrow-down"
              style={{
                marginLeft: '5px',
                marginBottom: '10px',
                color: '#444cf7',
                fontSize: '5em',
              }}
            ></i>

            <i
              className="pi pi-arrow-down"
              style={{
                marginLeft: '150px',
                marginTop: '50px',
                color: '#444cf7',
                fontSize: '2em',
              }}
            ></i>
          </div>
        )}

        <div
          className="p-inputgroup fake-action-input"
          style={{ marginBottom: '5px' }}
        >
          <InputText
            disabled
            autoFocus
            className="p-inputtext-md p-d-block"
            id="actionInput"
            placeholder="set 500"
            type="text"
          />
          <Button icon="pi pi-plus-circle" />
        </div>
      </div>
    </VizSensor>
  );
};

export default First;
