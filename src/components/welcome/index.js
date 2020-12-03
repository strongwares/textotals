import React, { useState } from 'react';
import { Button } from 'primereact/button';
import LoginForm from '../login';
import logo from '../../assets/icons/logo-colorbackground.jpg';
import PremiumForm from '../premium';
import RegisterForm from '../register';
import UnRegisterForm from '../unregister';
import * as C from '../../constants';
import './welcome.css';

const WelcomeScreen = ({ isMobileLandscape }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUnRegister, setShowUnRegister] = useState(false);
  const [showPremium, setShowPremium] = useState(false);

  const showWelcome =
    !showLogin && !showRegister && !showUnRegister && !showPremium;

  const buttonListClassName = `welcome-container-${
    isMobileLandscape ? 'row' : 'column'
  }`;

  const buttonStyle = isMobileLandscape
    ? undefined
    : { width: 'var(--responsive-inputGroupWidth)' };

  return (
    <div className="welcome-topcontainer">
      <img
        alt={`${C.APP_NAME} Logo`}
        className="p-mr-2"
        height="50"
        src={logo}
        title={`${C.APP_NAME}: ${C.APP_SHORT_DESCR}`}
      />

      {showLogin && (
        <LoginForm
          isMobileLandscape={isMobileLandscape}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showPremium && (
        <PremiumForm
          isMobileLandscape={isMobileLandscape}
          onClose={() => setShowPremium(false)}
        />
      )}

      {showRegister && (
        <RegisterForm
          isMobileLandscape={isMobileLandscape}
          onClose={() => setShowRegister(false)}
        />
      )}

      {showUnRegister && (
        <UnRegisterForm
          isMobileLandscape={isMobileLandscape}
          onClose={() => setShowUnRegister(false)}
        />
      )}

      {showWelcome && (
        <div className="welcome-container">
          <h2 style={{ marginTop: '-20px' }}>{`Welcome to ${C.APP_NAME}`}</h2>
          <h5
            style={{ marginTop: '-20px' }}
          >{`A playground for ${C.APP_SHORT_DESCR}`}</h5>

          <div className={buttonListClassName}>
            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label={C.PREMIUM_BUTTON_TEXT}
                onClick={() => setShowPremium(true)}
                style={buttonStyle}
              />
            </div>

            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label={C.REGISTER_BUTTON_TEXT}
                onClick={() => setShowRegister(true)}
                style={buttonStyle}
              />
            </div>

            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label={C.UNREGISTER_BUTTON_TEXT}
                onClick={() => setShowUnRegister(true)}
                style={buttonStyle}
              />
            </div>

            <div className="welcome-item">
              <Button
                className="p-button-rounded"
                label={C.LOGIN_BUTTON_TEXT}
                onClick={() => setShowLogin(true)}
                style={buttonStyle}
              />
            </div>
          </div>
          <div id="bottomSpacer" style={{ flex: 1 }} />
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
