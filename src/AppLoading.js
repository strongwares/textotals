import React, { useEffect } from 'react';
import 'animate.css/animate.min.css';
import './aatapp.css';

function doStartFunc(startFunc, onFinish) {
  startFunc();
  onFinish(true);
}

function AppLoading({ onFinish, startFunc }) {
  useEffect(() => {
    doStartFunc(startFunc, onFinish);
  }, [onFinish, startFunc]);

  return (
    <div className="apploading-container">
      <div className="animate__animated animate__bounceInDown">
        <i
          className="pi pi-spin pi-spinner"
          style={{
            marginTop: '30%',
            color: '#444cf7',
            fontSize: '8em',
          }}
        />
      </div>
    </div>
  );
}

export default AppLoading;
