import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';
import artists from './artists';
import selectedArtist from './selectedArtist';

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  router: routerReducer,
  artists,
  selectedArtist,
});

export default rootReducer;
