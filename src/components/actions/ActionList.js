import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ActionItem from './ActionItem';
import './actions.css';

const ActionList = ({ actions, isMobileLandscape }) => {
  const listEndRef = useRef(null);
  const scrollToBottom = () => {
    listEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [actions]);

  const actionList = actions.map((action) => {
    if (!action) {
      return undefined;
    }
    return <ActionItem key={action.timestampMs} action={action} />;
  });

  const classNames = `actionlist-container actionlist-container-${
    isMobileLandscape ? 'row' : 'column'
  }`;

  const listClassNames = `p-grid p-dir-${isMobileLandscape ? '' : 'col-'}rev`;

  return (
    <div className={classNames}>
      <div id="topSpacer" style={{ flex: 1 }} />
      <div className={listClassNames}>{actionList}</div>
      <div ref={listEndRef} />
    </div>
  );
};

ActionList.propTypes = {
  actions: PropTypes.array,
  isMobileLandscape: PropTypes.bool,
};

ActionList.defaultProps = {
  actions: [],
  isMobileLandscape: false,
};

export default ActionList;
