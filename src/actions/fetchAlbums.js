import Tidal from 'tidal-api-wrapper';
import * as types from './types';

const tidal = new Tidal();

const requestAlbums = () => ({
  type: types.REQ_ALBUMS,
});

const errorAlbums = e => ({
  type: types.ERR_ALBUMS,
  payload: e,
});

const receiveAlbums = albums => ({
  type: types.REC_ALBUMS,
  payload: albums,
});

const fetchAlbums = query => async (dispatch) => {
  dispatch(requestAlbums());
  try {
    const albums = await tidal.search(query, 'albums', 10);
    albums.forEach((album) => {
      album.cover = tidal.albumArtToUrl(album.cover);
    });
    dispatch(receiveAlbums(albums));
  } catch (e) {
    dispatch(errorAlbums(e));
  }
};

export default fetchAlbums;
