import React from 'react';
import ReactDOM from 'react-dom';

import Landing from './containers/Landing';
import App from './containers/App';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  createStore,
} from 'redux';

import rootReducers from './reducers';

import {
  Provider
} from 'react-redux';


const store = createStore(rootReducers);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route path="/app">
          <App/>
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
