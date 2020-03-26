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

import * as serviceWorker from './serviceWorker';


const store = createStore(rootReducers);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route basename={process.env.PUBLIC_URL} exact path="/">
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


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
