import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function ActionInput({ onInput = () => {} }) {
  let curVal;
  const onClick = () => {
    const value = curVal;
    onInput(value);
  };
  const onChange = (e) => {
    const { target } = e;
    const { value } = target;
    curVal = value;
  };
  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      onInput(curVal);
    }
  };
  return (
    <div className="p-inputgroup actions-input">
      <InputText
        autoFocus
        placeholder="Action"
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <Button onClick={onClick} icon="pi pi-plus-circle" />
    </div>
  );
}

export default ActionInput;
