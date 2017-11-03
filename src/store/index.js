import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export const history = createHistory();

const config = {
  apiKey: 'AIzaSyCuh8HinNEmkfMJAAf_zaG7vtK3Ymi088w',
  authDomain: 'tidal-down.firebaseapp.com',
  databaseURL: 'https://tidal-down.firebaseio.com',
  projectId: 'tidal-down',
  storageBucket: 'tidal-down.appspot.com',
  messagingSenderId: '442592023637',
};

// export this so we can access it to use transaction method
// react-redux-firebase doesn't support the transaction method
export const fb = firebase.initializeApp(config);

const createStoreWithMiddleware = compose(
  applyMiddleware(routerMiddleware(history)),
  reactReduxFirebase(fb, {}),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
