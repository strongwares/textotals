import React from 'react';
import ActionInput from './ActionInput';
import parser from '../../lib/ActionParser';
import './actions.css';

function onNewAction(action) {
  //console.log(`${action}`);
  parser.newAction(action);
}

function ActionsContainer() {
  return (
    <div className="actions-container">
      <div className="actions-list"></div>
      <ActionInput onInput={onNewAction} />
    </div>
  );
}

export default ActionsContainer;
