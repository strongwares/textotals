import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { parseAction } from '../../lib/actionParser';

function ActionInput({ onInput = () => {} }) {
  const [isValid, setIsValid] = useState(true);
  let curVal;

  const validateAndSubmitAction = (action) => {
    console.log(`validateAndSubmit action: ${action}`);
    const actionObj = parseAction(action);
    if (
      !actionObj ||
      !actionObj.op ||
      (actionObj.op !== 'link' &&
        actionObj.op !== 'unlink' &&
        !actionObj.amount)
    ) {
      console.log(`invalid input action string: ${action}`);
      setIsValid(false);
    } else {
      setIsValid(true);
      onInput(actionObj);
    }
  };

  const onClick = () => {
    validateAndSubmitAction(curVal);
  };

  const onChange = (e) => {
    const { target } = e;
    const { value } = target;
    curVal = value;
  };

  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      validateAndSubmitAction(curVal);
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
