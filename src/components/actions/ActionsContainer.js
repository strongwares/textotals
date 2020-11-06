import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ActionInput from './ActionInput';
import ActionList from './ActionList';
import handleAction from '../../lib/action/handleAction';
import { getActions } from '../../lib/action/persistenceUtils';
import './actions.css';

const utcdayjs = dayjs.extend(utc);

function onNewAction({ userName }, actionObj, setActions) {
  const theTime = utcdayjs.utc();
  const year = theTime.format('YYYY');
  const month = theTime.format('MMM');
  try {
    handleAction(userName, actionObj);
    setActions(getActions({ userName, month, year }));
  } catch (error) {
    console.error(`ActionsContainer error handling action: ${error}`);
  }
}

const ActionsContainer = ({ user, onHelp }) => {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    const theTime = utcdayjs.utc();
    const year = theTime.format('YYYY');
    const month = theTime.format('MMM');
    setActions(getActions({ userName: user.userName, month, year }));
  }, [user]);

  return (
    <div className="actions-container">
      <ActionList actions={actions} />
      <ActionInput
        onInput={(actionObj) => onNewAction(user, actionObj, setActions)}
        onHelp={onHelp}
      />
    </div>
  );
};

export default ActionsContainer;
