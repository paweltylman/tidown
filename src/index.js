import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import store, { history } from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route
            exact
            path="/"
            component={App}
          />
        </div>
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('root'),
);
registerServiceWorker();
