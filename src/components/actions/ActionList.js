import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import ActionItem from './ActionItem';
import './actions.css';

const ActionList = ({ actions = [] }) => {
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

  return (
    <div className="actionlist-container">
      <div id="topSpacer" style={{ flex: 1 }} />
      <div className="p-grid p-dir-col-rev">{actionList}</div>
      <div ref={listEndRef} />
    </div>
  );
};

export default ActionList;
