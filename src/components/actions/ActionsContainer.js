import React, { useContext } from 'react';
import ActionInput from './ActionInput';
import AuthContext from '../../auth/context';
import handleAction from '../../lib/action/handleAction';
import './actions.css';

function onNewAction({ name }, actionObj) {
  try {
    handleAction(name, actionObj);
  } catch (error) {
    console.error(`ActionsContainer error handling action: ${error}`);
  }
}

function ActionsContainer({ onHelp }) {
  const { userObj } = useContext(AuthContext);
  return (
    <div className="actions-container">
      <div className="actions-list"></div>
      <ActionInput
        onInput={(actionObj) => onNewAction(userObj, actionObj)}
        onHelp={onHelp}
      />
    </div>
  );
}

export default ActionsContainer;
