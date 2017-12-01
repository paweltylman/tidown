import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import WebFontLoader from 'webfontloader';
import Routes from './routes';
import store, { history } from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

history.listen((location) => {
  window.scrollTo(0, 0);
  store.dispatch({ type: 'CLEAR_ALBUMS' });
  store.dispatch({ type: 'CLEAR_ARTIST' });
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
