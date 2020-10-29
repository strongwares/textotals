import React, { useContext } from 'react';
import ActionInput from './ActionInput';
import AuthContext from '../../auth/context';
// import { parseAction } from '../../lib/actionParser';
import './actions.css';

function onNewAction(user, actionObj) {
  // console.log(`user: ${user.name}, action op: ${actionObj.op}`);
  /*
  const rval = parser.actionStrToValidObject(action);
  if (!rval.valid) {
    console.log('invalid');
  }
  */
}

function ActionsContainer({ onHelp }) {
  const { user } = useContext(AuthContext);
  return (
    <div className="actions-container">
      <div className="actions-list"></div>
      <ActionInput onInput={(a) => onNewAction(user, a)} onHelp={onHelp} />
    </div>
  );
}

export default ActionsContainer;
