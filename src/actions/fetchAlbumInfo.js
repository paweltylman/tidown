import Tidal from 'tidal-api-wrapper';
import * as types from './types';

const tidal = new Tidal();

const requestAlbumInfo = () => ({
  type: types.REQ_ALBUM_INFO,
});

const receiveAlbumInfo = album => ({
  type: types.REC_ALBUM_INFO,
  payload: album,
});

const errorAlbumInfo = e => ({
  type: types.ERR_ALBUM_INFO,
  payload: e,
});

const fetchAlbumInfo = id => async (dispatch) => {
  dispatch(requestAlbumInfo());
  try {
    const album = await tidal.getAlbum(id);
    const tracks = await tidal.getAlbumTracks(id);
    album.tracks = tracks;
    album.cover = tidal.albumArtToUrl(album.cover);
    dispatch(receiveAlbumInfo(album));
  } catch (e) {
    dispatch(errorAlbumInfo(e));
  }
};

export default fetchAlbumInfo;
