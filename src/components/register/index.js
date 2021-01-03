import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import useAuth from '../../auth/useAuth';
import { loginUser, registerUser } from '../../lib/user/persistenceUtils';
import { registerUser as actionsRegisterUser } from '../../lib/action/persistenceUtils';
import * as C from '../../constants';
import './register.css';

const RegisterForm = ({ isMobileLandscape, onClose }) => {
  const { onLogin } = useAuth();
  const [registerError, setRegisterError] = useState(undefined);
  const [passwordValue, setPassword] = useState('');
  const [emailValue, setEmail] = useState('');
  const [nameValue, setName] = useState('');

  async function onRegisterClick(userName, email, password) {
    const userObj = {
      userName: userName.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };
    let response = await registerUser(userObj);

    if (!response.ok) {
      if (response.data) {
        setRegisterError(response.data.error);
      } else {
        setRegisterError(`${C.REGISTER_BUTTON_TEXT} error`);
      }
      return;
    }

    await actionsRegisterUser(userObj);

    if (registerError) {
      setRegisterError(undefined);
    }

    response = await loginUser(userObj.userName, userObj.password);
    onLogin(response.data.text);
  }

  const inputGroupClassName = `registerform-inputgroup-${
    isMobileLandscape ? 'row' : 'column'
  }`;

  return (
    <div className="registerform-container">
      {!!registerError && (
        <div className="registerform-inputgroup">
          <Message severity="warn" text={registerError} />
        </div>
      )}

      <div
        style={{ marginTop: '-15px', marginBottom: '-5px' }}
        className="p-inputgroup registerform-inputgroup"
      >
        <h2>{C.REGISTER_BUTTON_TEXT}:</h2>
      </div>

      <div className={inputGroupClassName}>
        <div
          className="registerform-inputgroup p-inputgroup"
          style={{ marginBottom: '10px' }}
        >
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="userName"
              value={nameValue}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              style={{ fontSize: '14px', fontWeight: 'bold' }}
              htmlhtmlFor="userName"
            >
              Name (a single word)
            </label>
          </span>
        </div>

        <div
          className="registerform-inputgroup p-inputgroup"
          style={{ marginBottom: '10px' }}
        >
          <span className="p-inputgroup-addon">
            <i className="pi pi-envelope"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="userEmail"
              value={emailValue}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              style={{ fontSize: '14px', fontWeight: 'bold' }}
              htmlhtmlFor="userEmail"
            >
              Email Address
            </label>
          </span>
        </div>

        <div
          className="p-inputgroup registerform-inputgroup"
          style={{ marginBottom: '10px' }}
        >
          <span className="p-inputgroup-addon">
            <i className="pi pi-lock"></i>
          </span>
          <Password
            id="userPassword"
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <Button
        className="p-button-rounded"
        disabled={!passwordValue || !nameValue || !emailValue}
        label={C.REGISTER_BUTTON_TEXT}
        onClick={() => onRegisterClick(nameValue, emailValue, passwordValue)}
        style={{ width: 'var(--responsive-inputGroupWidth)' }}
      />

      <Button
        className="p-button-rounded"
        icon="pi pi-arrow-left"
        onClick={onClose}
        style={{ marginTop: '10px', maxWidth: '100px' }}
      />

      <div id="bottomSpacer" style={{ flex: 1 }} />
    </div>
  );
};

RegisterForm.propTypes = {
  isMobileLandscape: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  isMobileLandscape: false,
};

export default RegisterForm;
