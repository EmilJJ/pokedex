import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design-icons/css/material-icons.min.css';

import configureStore from './store';
import MainRouter from './routing';

const store = configureStore(browserHistory);
const syncedHistory = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <MainRouter history={syncedHistory} store={store} />
  </Provider>,
  window.document.getElementById('root'),
);
