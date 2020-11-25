import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import useAuth from '../../auth/useAuth';
import { loginUser, registerUser } from '../../lib/user/persistenceUtils';
import { registerUser as actionsRegisterUser } from '../../lib/action/persistenceUtils';
import * as C from '../../constants';
import './register.css';

const RegisterForm = ({ onClose }) => {
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
        // console.log(`Registration error: ${response.data.error}`);
        setRegisterError(response.data.error);
      } else {
        setRegisterError(`${C.REGISTER_BUTTON_TEXT} error`);
        // console.log("Registration error response: ", response);
      }
      return;
    }

    await actionsRegisterUser(userObj);

    if (registerError) {
      setRegisterError(undefined);
    }

    response = await loginUser(userObj.userName, userObj.password);
    // console.log('register login result:');
    // console.table(response.data.text);
    onLogin(response.data.text);
  }

  return (
    <div className="registerform-container">
      <div style={{ margin: '20px 0px 0px 0px' }} className="p-grid p-fluid">
        <div className="p-col-12 p-md-12">
          {!!registerError && (
            <div className="registerform-inputgroup">
              <Message severity="warn" text={registerError} />
            </div>
          )}

          <div
            style={{ marginBottom: '0px' }}
            className="p-inputgroup registerform-inputgroup"
          >
            <h2 style={{ marginBottom: '0px', marginTop: '0px' }}>
              {C.REGISTER_BUTTON_TEXT}:
            </h2>
          </div>

          <div className="p-inputgroup registerform-inputgroup">
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
                User Name (single word user ID)
              </label>
            </span>
          </div>

          <div className="p-inputgroup registerform-inputgroup">
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

          <div className="p-inputgroup registerform-inputgroup">
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
            disabled={!passwordValue || !nameValue || !emailValue}
            label={C.REGISTER_BUTTON_TEXT}
            onClick={() =>
              onRegisterClick(nameValue, emailValue, passwordValue)
            }
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

export default RegisterForm;
