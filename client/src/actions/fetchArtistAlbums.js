import Promise from 'bluebird';
import Tidal from 'tidal-api-wrapper';
import filterAlbums from '../helpers/filterAlbums';
import * as types from './types';

const tidal = new Tidal();

const requestArtistAlbums = () => ({
  type: types.REQ_ARTIST_ALBUMS,
});

const receiveArtistAlbums = albums => ({
  type: types.REC_ARTIST_ALBUMS,
  payload: albums,
});

const errorArtistAlbums = err => ({
  type: types.ERR_ARTIST_ALBUMS,
  payload: err,
});

const fetchArtistInfo = id => async (dispatch) => {
  dispatch(requestArtistAlbums());
  try {
    let albums = await tidal.getArtistAlbums(id);
    albums = filterAlbums(albums);
    await Promise.map(albums, async (album) => {
      const tracks = await tidal.getAlbumTracks(album.id);
      album.tracks = tracks;
      album.cover = tidal.albumArtToUrl(album.cover);
      return album;
    });
    dispatch(receiveArtistAlbums(albums));
  } catch (e) {
    dispatch(errorArtistAlbums(e));
  }
};

export default fetchArtistInfo;
