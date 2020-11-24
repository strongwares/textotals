import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import parseAction from '../../lib/action/parseAction';

function ActionInput({ onHelp = () => {}, onInput = () => {} }) {
  const [isValid, setIsValid] = useState(true);
  const [curValue, setValue] = useState('');

  const validateAndSubmitAction = (action) => {
    const actionStr = action && action.trim();
    if (!actionStr || actionStr.length === 0) {
      return;
    }

    if (actionStr.toLowerCase() === 'help') {
      onHelp();
      setValue('');
      return;
    }

    const actionObj = parseAction(actionStr);
    if (!actionObj || !actionObj.isValid) {
      console.log(`invalid input action string: ${actionStr}`);
      setIsValid(false);
    } else {
      setIsValid(true);
      onInput(actionObj);
      setValue('');
    }
  };

  const onClick = () => {
    validateAndSubmitAction(curValue);
  };

  const onChange = (e) => {
    const { target } = e;
    const { value } = target;
    if (
      (!value || value.length === 0) &&
      curValue &&
      curValue.length > 0 &&
      !isValid
    ) {
      setIsValid(true);
    }
    setValue(value);
  };

  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      validateAndSubmitAction(curValue);
    }
  };

  return (
    <>
      <div className="p-inputgroup actions-input">
        <InputText
          autoFocus={false}
          className="p-inputtext-lg p-d-block"
          id="actionInput"
          placeholder="Type 'help' or type an action"
          onChange={onChange}
          onKeyPress={onKeyPress}
          type="text"
          value={curValue}
        />
        <Button
          className="p-button-sm"
          onClick={onClick}
          icon="pi pi-plus-circle"
        />
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
