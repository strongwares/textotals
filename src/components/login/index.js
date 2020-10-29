import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import useAuth from '../../auth/useAuth';
import logo from '../../assets/icons/logo.png';
import './login.css';

const LoginForm = () => {
  const { onLogin } = useAuth();
  const [passwordValue, setPassword] = useState('');
  const [emailValue, setEmail] = useState('');
  const [nameValue, setName] = useState('');
  const onLoginClick = (name, email, password) => {
    // setUser({ name, email, password });
    onLogin({ name, email, password });
  };
  return (
    <div className="loginform-container">
      <img
        alt="Action Accounts Totals Logo"
        className="p-mr-2"
        height="50"
        src={logo}
        title="Action Accounts Totals"
      />
      <div style={{ margin: '20px 0px 0px 0px' }} className="p-grid p-fluid">
        <div className="p-col-12 p-md-12">
          <div className="p-inputgroup loginform-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              value={nameValue}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="p-inputgroup loginform-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <InputText
              value={emailValue}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="p-inputgroup loginform-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <Password
              value={passwordValue}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="p-button-rounded"
            disabled={!passwordValue || !nameValue || !emailValue}
            label="Login"
            onClick={() => onLoginClick(nameValue, emailValue, passwordValue)}
          />
        </div>
      </div>
      <div id="bottomSpacer" style={{ flex: 1 }} />
    </div>
  );
};

export default LoginForm;
