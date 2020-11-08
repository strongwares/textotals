import React from 'react';
// import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';
// import defaults from '../../lib/action/defaults';
import './actions.css';

const TOTALS_SEP = '::';
const ACCOUNT_SEP = ':::';

function getActionString(str) {
  return str.replace(TOTALS_SEP, '\nTotals:\n').replace(ACCOUNT_SEP, '\n');
}

function getTotalsString(str) {
  return `Totals:\n${str.replace(ACCOUNT_SEP, '\n')}`;
}

function getDateString(timestampMs) {
  const aMoment = dayjs(timestampMs);
  const nowMoment = dayjs();
  let rval;
  // Inside of a minute ago:
  if (aMoment.isAfter(nowMoment.startOf('minute'))) {
    rval = 'A couple of seconds ago';
  }
  // Same day:
  else if (aMoment.isAfter(nowMoment.startOf('day'))) {
    rval = aMoment.format('h:mm a');
  }
  // Yesterday:
  else if (aMoment.isAfter(nowMoment.startOf('day').subtract(1, 'd'))) {
    rval = 'Yesterday ' + aMoment.format('h:mm a');
  }
  // In past week
  else if (aMoment.isAfter(nowMoment.startOf('day').subtract(1, 'w'))) {
    rval = aMoment.format('dddd h:mm a');
  }
  // Longer than a week ago:
  else {
    rval = aMoment.format('dddd M/D/YY h:mm a');
  }
  return rval;
}

const ActionItem = ({ action }) => {
  const { actionStr, timestampMs } = action;

  // <div className="action-item-actionstr">{getActionString(actionStr)}</div>
  const chunks = actionStr.split(TOTALS_SEP);
  return (
    <div className="action-item">
      <div className="action-item-date">{getDateString(timestampMs)}</div>
      <div className="action-item-action">{chunks[0]}</div>
      <div className="action-item-totals">
        {getTotalsString(chunks.length > 1 && chunks[1])}
      </div>
    </div>
  );
};

export default ActionItem;
