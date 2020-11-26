import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { unRegisterUser } from '../../lib/user/persistenceUtils';
import { unRegisterUser as actionsUnRegisterUser } from '../../lib/action/persistenceUtils';
import * as C from '../../constants';
import './unregister.css';

const UnRegisterForm = ({ onClose }) => {
  const [unRegisterError, setUnRegisterError] = useState(undefined);
  const [passwordValue, setPassword] = useState('');
  const [nameValue, setName] = useState('');

  async function onUnRegisterClick(userName, password) {
    const userObj = {
      userName: userName.trim().toLowerCase(),
      password: password.trim(),
    };
    let response = await unRegisterUser(userObj);

    if (!response.ok) {
      if (response.data) {
        // console.log(`Registration error: ${response.data.error}`);
        setUnRegisterError(response.data.error);
      } else {
        setUnRegisterError(`${C.UNREGISTER_BUTTON_TEXT} error`);
        // console.log("Registration error response: ", response);
      }
      return;
    }

    await actionsUnRegisterUser(userObj);

    if (unRegisterError) {
      setUnRegisterError(undefined);
    } else {
      setUnRegisterError('Successfully removed that user');
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }

  return (
    <div className="unregisterform-container">
      <div style={{ margin: '20px 0px 0px 0px' }} className="p-grid p-fluid">
        <div className="p-col-12 p-md-12">
          {!!unRegisterError && (
            <div className="unregisterform-inputgroup">
              <Message severity="warn" text={unRegisterError} />
            </div>
          )}

          <div
            style={{ marginTop: '-15px', marginBottom: '-25px' }}
            className="p-inputgroup unregisterform-inputgroup"
          >
            <h2>{C.UNREGISTER_BUTTON_TEXT}:</h2>
          </div>

          <div className="p-inputgroup unregisterform-inputgroup">
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

          <div className="p-inputgroup unregisterform-inputgroup">
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
            label={C.UNREGISTER_BUTTON_TEXT}
            onClick={() => onUnRegisterClick(nameValue, passwordValue)}
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

export default UnRegisterForm;
