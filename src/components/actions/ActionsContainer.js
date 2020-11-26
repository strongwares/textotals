import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ActionInput from './ActionInput';
import ActionList from './ActionList';
import handleAction from '../../lib/action/handleAction';
import { getActions, pruneActions } from '../../lib/action/persistenceUtils';
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

    // The local storage non-premium user will only have
    // a month of actions stored.
    // So just making it easy to delete previous month data
    // when we query for actions.
    // Yes badly repetitive, but easy to do for now
    const thePrevMonth = utcdayjs.utc().subtract(1, 'month');
    const prevYear = thePrevMonth.format('YYYY');
    const prevMonth = thePrevMonth.format('MMM');
    pruneActions({
      userName: user.userName,
      month: prevMonth,
      year: prevYear,
    });

    setActions(
      getActions({
        userName: user.userName,
        month,
        year,
      })
    );
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
