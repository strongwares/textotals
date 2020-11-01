import React, { useState } from 'react';
import { Button } from 'primereact/button';
import LoginForm from '../login';
import logo from '../../assets/icons/logo.png';
import RegisterForm from '../register';
import './welcome.css';

const WelcomeScreen = ({ onShowLogin, onShowRegister }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const showWelcome = !showLogin && !showRegister;

  return (
    <div className="welcome-container">
      <img
        alt="Textotals Logo"
        className="p-mr-2"
        height="50"
        src={logo}
        title="Texotals"
      />

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}

      {showWelcome && (
        <div style={{ margin: '20px 0px 0px 0px' }} className="p-grid p-fluid">
          <div className="p-col-12 p-md-12">
            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label="Register"
                onClick={() => setShowRegister(true)}
              />
            </div>

            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label="Login"
                onClick={() => setShowLogin(true)}
              />
            </div>
          </div>
        </div>
      )}
      <div id="bottomSpacer" style={{ flex: 1 }} />
    </div>
  );
};

export default WelcomeScreen;
