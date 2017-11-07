import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { routerReducer } from 'react-router-redux';
import artists from './artists';
import selectedArtist from './selectedArtist';
import albums from './albums';
import selectedAlbum from './selectedAlbum';

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  router: routerReducer,
  artists,
  selectedArtist,
  albums,
  selectedAlbum,
});

export default rootReducer;
