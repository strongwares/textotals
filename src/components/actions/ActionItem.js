import React from 'react';
import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';
import * as C from '../../constants';
import './actions.css';

// TODO: Bad duplication
// TODO: Only change this if you are changing lib/action/handleAccountAction
const TOTALS_SEP = '::';
const ACCOUNT_SEP = ':;:';

function getResponseString(str) {
  if (str.indexOf(C.APP_NAME) === 0) {
    return str.replace(ACCOUNT_SEP, '\n');
  }
  return `Account Total:\n${str.replace(ACCOUNT_SEP, '\n')}`;
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

  const chunks = actionStr.split(TOTALS_SEP);
  const haveResponse = chunks.length > 1 && chunks[1].length > 0;
  return (
    <div className="action-item">
      <div className="action-item-date">{getDateString(timestampMs)}</div>
      <div className="action-item-action">{chunks[0]}</div>
      {haveResponse && (
        <div className="action-item-response">
          {getResponseString(chunks[1])}
        </div>
      )}
    </div>
  );
};

ActionItem.propTypes = {
  action: PropTypes.object.isRequired,
};

export default ActionItem;
