import Tidal from 'tidal-api-wrapper';
import Promise from 'bluebird';
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

const errorArtistInfo = e => ({
  type: types.ERR_ARTIST_INFO,
  payload: e,
});

const fetchArtistInfo = id => async (dispatch) => {

  dispatch(requestArtistInfo());

  try {

    const [artist, albums, topTracks] = await Promise.all([
      tidal.getArtist(id),
      tidal.getArtistAlbums(id),
      tidal.getArtistTopTracks(id),
    ]);

    const eps = await tidal.getArtistEPsAndSingles(id);

    const allAlbums = albums.concat(eps.filter(album => album.type !== 'SINGLE'));

    const filteredAlbums = await Promise.map(filterAlbums(allAlbums), async (album) => {
      const tracks = await tidal.getAlbumTracks(album.id);
      album.cover = tidal.albumArtToUrl(album.cover);
      album.tracks = tracks;
      return album;
    });

    if (artist.picture) {
      artist.picture = tidal.artistPicToUrl(artist.picture);
    } else {
      artist.picture = {
        sm: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
        md: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
        lg: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
      };
    }

    const data = {
      ...artist,
      albums: filteredAlbums,
      topTracks,
    };

    dispatch(receiveArtistInfo(data));

  } catch (e) {

    dispatch(errorArtistInfo());
  }
};

export default fetchArtistInfo;
