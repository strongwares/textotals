import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import parseAction from '../../lib/action/parseAction';

function ActionInput({ onHelp = () => {}, onInput = () => {} }) {
  const [isValid, setIsValid] = useState(true);
  let curVal;

  const validateAndSubmitAction = (action) => {
    const actionStr = action && action.trim();
    if (!actionStr || actionStr.length === 0) {
      return;
    }

    if (actionStr.toLowerCase() === 'help') {
      onHelp();
      return;
    }

    const actionObj = parseAction(actionStr);
    if (!actionObj || !actionObj.isValid) {
      console.log(`invalid input action string: ${actionStr}`);
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
    if (
      (!value || value.length === 0) &&
      curVal &&
      curVal.length > 0 &&
      !isValid
    ) {
      setIsValid(true);
    }
    curVal = value;
  };

  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      validateAndSubmitAction(curVal);
    }
  };

  return (
    <>
      <div className="p-inputgroup actions-input">
        <InputText
          autoFocus
          className="p-inputtext-md p-d-block"
          id="actionInput"
          placeholder="Enter action to take or 'help'"
          onChange={onChange}
          onKeyPress={onKeyPress}
          type="text"
        />
        <Button onClick={onClick} icon="pi pi-plus-circle" />
      </div>
      {!isValid && (
        <div className="actions-input-invalid">
          <small id="actionInput-help" className="p-invalid p-d-block">
            Sorry, not a valid action!
          </small>
        </div>
      )}
    </>
  );
}

export default ActionInput;
