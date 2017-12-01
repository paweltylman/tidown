import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes';
import store, { history } from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

history.listen((location) => {
  window.scrollTo(0, 0);
});

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('root'),
);
registerServiceWorker();
