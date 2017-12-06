import Tidal from 'tidal-api-wrapper';
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
    const tracks = await tidal.getAlbumTracks(id);
    album.tracks = tracks;

    // parse the album cover
    if (album.cover) {
      album.cover = tidal.albumArtToUrl(album.cover);
    } else {
      album.cover = {
        xs: 'https://listen.tidal.com/defaultAlbumAndTrackImage.38e22b.svg',
        sm: 'https://listen.tidal.com/defaultAlbumAndTrackImage.38e22b.svg',
        md: 'https://listen.tidal.com/defaultAlbumAndTrackImage.38e22b.svg',
        lg: 'https://listen.tidal.com/defaultAlbumAndTrackImage.38e22b.svg',
      };
    }

    dispatch(receiveAlbum(album));

  } catch (e) {

    dispatch(errorAlbum(e));

  }
};

export default fetchAlbum;
