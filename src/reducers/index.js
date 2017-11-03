import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  router: routerReducer,
});

export default rootReducer;
