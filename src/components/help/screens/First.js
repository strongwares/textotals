import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'animate.css/animate.min.css';
import './helpscreen.css';

const First = (
  <div className="helpscreen-item">
    <h2 style={{ textAlign: 'center' }} className="p-mt-0 p-mb-3">
      First
    </h2>
    <h4 className="p-mt-0 p-mb-3">
      On the Action tab, enter an action in the bottom text box like here:
    </h4>
    <div id="spacer" style={{ flex: 1 }} />
    <div className="fake-input-arrow animate__animated animate__bounceInDown" />
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
);

export default First;
