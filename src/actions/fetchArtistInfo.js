import Promise from 'bluebird';
import Tidal from 'tidal-api-wrapper';
import filterAlbums from '../helpers/filterAlbums';
import * as types from './types';

const tidal = new Tidal();

const requestArtistInfo = () => ({
  type: types.REQ_ARTIST_INFO,
});

const receiveArtistInfo = artist => ({
  type: types.REC_ARTIST_INFO,
  payload: artist,
});

const errorArtistInfo = err => ({
  type: types.ERR_ARTIST_INFO,
  payload: err,
});

const fetchArtistInfo = id => async (dispatch) => {
  dispatch(requestArtistInfo());
  try {
    const artist = await tidal.getArtist(id);
    const albums = await tidal.getArtistAlbums(id);
    artist.albums = filterAlbums(albums);
    await Promise.map(artist.albums, async (album) => {
      const tracks = await tidal.getAlbumTracks(album.id);
      album.tracks = tracks;
      album.cover = tidal.albumArtToUrl(album.cover);
      return album;
    });
    dispatch(receiveArtistInfo(artist));
  } catch (e) {
    dispatch(errorArtistInfo(e));
  }
};

export default fetchArtistInfo;
