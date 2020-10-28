import React from 'react';
import ActionInput from './ActionInput';
// import { parseAction } from '../../lib/actionParser';
import './actions.css';

function onNewAction(actionObj) {
  console.log('action obj:');
  console.table(actionObj);
  /*
  const rval = parser.actionStrToValidObject(action);
  if (!rval.valid) {
    console.log('invalid');
  }
  */
}

function ActionsContainer({ onHelp }) {
  return (
    <div className="actions-container">
      <div className="actions-list"></div>
      <ActionInput onInput={onNewAction} onHelp={onHelp} />
    </div>
  );
}

export default ActionsContainer;
