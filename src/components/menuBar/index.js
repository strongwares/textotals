import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../auth/context';
import useAuth from '../../auth/useAuth';
import logo from '../../assets/icons/logo.png';
import * as C from '../../constants';
import './menubar.css';

const MenuBar = ({ onItemClick }) => {
  const { user } = useContext(AuthContext);
  const { onLogout } = useAuth();

  return (
    <div className="menubar-container">
      <img
        alt={`${C.APP_NAME} Logo`}
        className="p-mr-2"
        height="20"
        src={logo}
        title={`${C.APP_NAME} ${C.APP_SHORT_DESCR}`}
      />
      <i
        title="Show Help"
        className="pi pi-question-circle menubar-icon"
        onClick={() => onItemClick('help')}
      />
      <div id="spacer" style={{ flex: 1 }} />

      {!!user && (
        <div>
          <span>{user.userName}</span>
        </div>
      )}
      <div id="spacer" style={{ flex: 1 }} />

      {!!user && (
        <>
          <span style={{ marginRight: '10px' }}>Logout: </span>
          <i
            title="Logout"
            className="pi pi-sign-out menubar-icon"
            onClick={onLogout}
          />
        </>
      )}
    </div>
  );
};

MenuBar.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default MenuBar;
