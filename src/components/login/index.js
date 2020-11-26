import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import useAuth from '../../auth/useAuth';
import { loginUser } from '../../lib/user/persistenceUtils';
import * as C from '../../constants';
import './login.css';

const LoginForm = ({ onClose }) => {
  const { onLogin } = useAuth();
  const [loginError, setLoginError] = useState(undefined);
  const [passwordValue, setPassword] = useState('');
  const [nameValue, setName] = useState('');

  async function onLoginClick(name, password) {
    const response = await loginUser(
      name.trim().toLowerCase(),
      password.trim()
    );
    if (!response.ok) {
      if (response.data) {
        setLoginError(response.data.error);
      } else {
        setLoginError('Login failed');
      }
      return;
    }

    // console.log('login result:');
    // console.table(response.data);

    if (loginError) {
      setLoginError(undefined);
    }
    onLogin(response.data.text);
  }

  return (
    <div className="loginform-container">
      <div style={{ margin: '20px 0px 0px 0px' }} className="p-grid p-fluid">
        <div className="p-col-12 p-md-12">
          {!!loginError && (
            <div className="loginform-inputgroup">
              <Message severity="warn" text={loginError} />
            </div>
          )}

          <div
            style={{ marginTop: '-15px', marginBottom: '-25px' }}
            className="p-inputgroup loginform-inputgroup"
          >
            <h2>{`${C.LOGIN_BUTTON_TEXT}:`}</h2>
          </div>

          <div className="p-inputgroup loginform-inputgroup">
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
                Name (single word user ID)
              </label>
            </span>
          </div>

          <div className="p-inputgroup loginform-inputgroup">
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

          <Button
            className="p-button-rounded"
            disabled={!passwordValue || !nameValue}
            label={C.LOGIN_BUTTON_TEXT}
            onClick={() => onLoginClick(nameValue, passwordValue)}
          />

          <Button
            className="p-button-rounded"
            icon="pi pi-arrow-left"
            onClick={onClose}
            style={{ marginTop: '10px', maxWidth: '100px' }}
          />
        </div>
      </div>
      <div id="bottomSpacer" style={{ flex: 1 }} />
    </div>
  );
};

export default LoginForm;
