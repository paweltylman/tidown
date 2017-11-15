import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';
import artistAutocomplete from './artistAutocomplete';
import albumAutocomplete from './albumAutocomplete';
import albums from './albums';
import newAlbums from './newAlbums';
import artist from './artist';

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  router: routerReducer,
  artistAutocomplete,
  albumAutocomplete,
  albums,
  newAlbums,
  artist,
});

export default rootReducer;
