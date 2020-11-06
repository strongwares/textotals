import React from 'react';
// import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';
// import defaults from '../../lib/action/defaults';
import './actions.css';

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
  else if (aMoment.isAfter(nowMoment.startOf('week'))) {
    rval = aMoment.format('dddd h:mm a');
  }
  // Longer than a week ago:
  else {
    rval = aMoment.format('M/D/YY h:mm a');
  }
  return rval;
}

const ActionItem = ({ action }) => {
  const { actionStr, timestampMs } = action;

  return (
    <div className="action-item">
      <div className="action-item-date">{getDateString(timestampMs)}</div>
      <div className="action-item-actionstr">{actionStr}</div>
    </div>
  );
};

export default ActionItem;