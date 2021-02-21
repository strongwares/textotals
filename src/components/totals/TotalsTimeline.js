import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as dayjs from 'dayjs';
import { Timeline } from 'primereact/timeline';
import utc from 'dayjs/plugin/utc';
import { getActions } from '../../lib/action/persistenceUtils';
import './totals.css';

const utcdayjs = dayjs.extend(utc);

const TotalsTimeline = ({ group, user, op }) => {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    const theTime = utcdayjs.utc();
    const year = theTime.format('YYYY');
    const month = theTime.format('MMM');

    const filter = { group, op };
    setActions(
      getActions({
        userName: user.userName,
        month,
        year,
        filter,
      })
    );
  }, [group, user, op]);

  let preposition;
  let what = `Account Group ${group}: `;
  if (op === 'spend') {
    what += 'Spending Timeline';
    preposition = 'on';
  } else {
    what += 'Giving Timeline';
    preposition = 'to';
  }

  /*
  const layout = isMobileLandscape ? 'horizontal' : 'vertical';
  if (isMobileLandscape) {
    return (
      <div className="totalstimeline-container totalstimeline-container-horizontal card">
        <h3>{what}</h3>
        <Timeline
          value={actions}
          align="top"
          content={(item) => (
            <small className="p-text-secondary">
              {`${dayjs(item.timestampMs).format('dddd M/D/YY h:mm a')} ${(
                +item.amount / 100
              ).toFixed(2)} ${preposition} ${item.category}`}
            </small>
          )}
          layout="horizontal"
        />
      </div>
    );
  } else {
 */
  return (
    <div className="totalstimeline-container card">
      <h3>{what}</h3>
      <Timeline
        value={actions}
        opposite={(item) =>
          `${(+item.amount / 100).toFixed(2)} ${preposition} ${item.category}`
        }
        content={(item) => (
          <small className="p-text-secondary">
            {dayjs(item.timestampMs).format('dddd M/D/YY h:mm a')}
          </small>
        )}
      />
    </div>
  );
};

TotalsTimeline.propTypes = {
  group: PropTypes.string.isRequired,
  op: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default TotalsTimeline;
