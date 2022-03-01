import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
// import './semantic.min.css';
import App from './App';
import store from './stores/configureStore'


ReactDOM.render(
  <Provider store={store}>
    <App title="Crypto Portfolio"/>
  </Provider>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
