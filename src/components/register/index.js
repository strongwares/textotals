import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import useAuth from '../../auth/useAuth';
import { loginUser, registerUser } from '../../lib/user/persistenceUtils';
import './register.css';

const RegisterForm = ({ onClose }) => {
  const { onLogin } = useAuth();
  const [registerError, setRegisterError] = useState(undefined);
  const [passwordValue, setPassword] = useState('');
  const [emailValue, setEmail] = useState('');
  const [nameValue, setName] = useState('');

  async function onRegisterClick(userName, email, password) {
    const userObj = { userName, email, password };
    let response = await registerUser(userObj);

    if (!response.ok) {
      if (response.data) {
        // console.log(`Registration error: ${response.data.error}`);
        setRegisterError(response.data.error);
      } else {
        setRegisterError('Registration error');
        // console.log("Registration error response: ", response);
      }
      return;
    }

    console.log('register result:');
    console.table(response.data.text);

    if (registerError) {
      setRegisterError(undefined);
    }

    response = await loginUser(userObj.userName, userObj.password);
    console.log('register login result:');
    console.table(response.data.text);
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

          <div className="p-inputgroup registerform-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <span className="p-float-label">
              <InputText
                id="userName"
                value={nameValue}
                onChange={(e) => setName(e.target.value)}
                placeholder="User Name: a single word user ID"
              />
              <label htmlhtmlFor="userName">User Name:</label>
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
                placeholder="Email: your email address"
              />
              <label htmlhtmlFor="userEmail">Email:</label>
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
            label="Register"
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
