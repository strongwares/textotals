import React, { useState } from 'react';
import { Button } from 'primereact/button';
import LoginForm from '../login';
import logo from '../../assets/icons/logo.png';
import PremiumForm from '../premium';
import RegisterForm from '../register';
import UnRegisterForm from '../unregister';
import * as C from '../../constants';
import './welcome.css';

const WelcomeScreen = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUnRegister, setShowUnRegister] = useState(false);
  const [showPremium, setShowPremium] = useState(false);

  const showWelcome =
    !showLogin && !showRegister && !showUnRegister && !showPremium;

  return (
    <div className="welcome-container">
      <img
        alt={`${C.APP_NAME} Logo`}
        className="p-mr-2"
        height="50"
        src={logo}
        title={`${C.APP_NAME}: ${C.APP_SHORT_DESCR}`}
      />

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}

      {showPremium && <PremiumForm onClose={() => setShowPremium(false)} />}

      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}

      {showUnRegister && (
        <UnRegisterForm onClose={() => setShowUnRegister(false)} />
      )}

      {showWelcome && (
        <div style={{ margin: '20px 0px 0px 0px' }} className="p-grid p-fluid">
          <div className="p-col-12 p-md-12">
            <h2>{`Welcome to ${C.APP_NAME}`}</h2>
            <h5>{`A playground for ${C.APP_SHORT_DESCR}`}</h5>

            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label={C.PREMIUM_BUTTON_TEXT}
                onClick={() => setShowPremium(true)}
              />
            </div>

            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label={C.REGISTER_BUTTON_TEXT}
                onClick={() => setShowRegister(true)}
              />
            </div>

            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label={C.UNREGISTER_BUTTON_TEXT}
                onClick={() => setShowUnRegister(true)}
              />
            </div>

            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label={C.LOGIN_BUTTON_TEXT}
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
