import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const history = createHistory();

const config = {
  apiKey: 'AIzaSyAgiAm38GOo-1auEAeuvOZOo60ncRy1FXU',
  authDomain: 'tidown-c24a9.firebaseapp.com',
  databaseURL: 'https://tidown-c24a9.firebaseio.com',
  projectId: 'tidown-c24a9',
  storageBucket: 'tidown-c24a9.appspot.com',
  messagingSenderId: '30129502185',
};

// export this so we can access it to use transaction method
// react-redux-firebase doesn't support the transaction method
export const fb = firebase.initializeApp(config);

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, routerMiddleware(history)),
  reactReduxFirebase(fb, {}),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
