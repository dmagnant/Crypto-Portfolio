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
