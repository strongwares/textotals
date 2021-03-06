import React from 'react';
import ReactDOM from 'react-dom';
import PrimeReact from 'primereact/utils';
import App from './App';
import { initPersistence } from './lib/persistenceUtils';
import localStoragePersister from './persistence/localStorage/LocalStoragePersister';
import localStorageUsers from './persistence/localStorage/LocalStorageUsers';
// import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './index.css';

PrimeReact.ripple = true;

initPersistence(localStoragePersister, localStorageUsers);

// <React.StrictMode></React.StrictMode>
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
