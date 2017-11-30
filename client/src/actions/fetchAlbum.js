import Tidal from 'tidal-api-wrapper';
import { fb } from '../store';
import * as types from './types';

const tidal = new Tidal();

const requestAlbum = () => ({
  type: types.REQ_ALBUM,
});

const receiveAlbum = album => ({
  type: types.REC_ALBUM,
  payload: album,
});

const errorAlbum = e => ({
  type: types.ERR_ALBUM,
  payload: e,
});

const fetchAlbum = id => async (dispatch) => {

  dispatch(requestAlbum());

  try {

    const album = await tidal.getAlbum(id);

    const fbAlbum = await fb.database().ref(`/artists/${album.artist.id}/albums/${album.id}`).once('value');

    if (fbAlbum.val()) {

      album.path = fbAlbum.val().path;
      album.tracks = fbAlbum.val().tracks;

    } else {

      const tracks = await tidal.getAlbumTracks(id);
      album.tracks = tracks;

    }

    album.cover = tidal.albumArtToUrl(album.cover);

    dispatch(receiveAlbum(album));

  } catch (e) {

    dispatch(errorAlbum(e));

  }
};

export default fetchAlbum;
