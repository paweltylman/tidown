import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';
import artistAutocomplete from './artistAutocomplete';
import albumAutocomplete from './albumAutocomplete';
import albums from './albums';
import newAlbums from './newAlbums';

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  router: routerReducer,
  artistAutocomplete,
  albumAutocomplete,
  albums,
  newAlbums,
});

export default rootReducer;
