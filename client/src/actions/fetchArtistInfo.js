import Tidal from 'tidal-api-wrapper';
import Promise from 'bluebird';
import filterAlbums from '../helpers/filterAlbums';
import { fb } from '../store';
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

    // get artist info, albums, top tracks, and eps
    const [artist, albums, topTracks, eps] = await Promise.all([
      tidal.getArtist(id),
      tidal.getArtistAlbums(id),
      tidal.getArtistTopTracks(id),
      tidal.getArtistEPsAndSingles(id),
    ]);

    // concat artist albums and eps and remove artist singles
    let allAlbums = albums.concat(eps.filter(album => album.type !== 'SINGLE'));
    // append more info to each album
    allAlbums = await Promise.map(filterAlbums(allAlbums), async (album) => {
      // check if the album exists in the database to see if it has already been downloaded
      const fbAlbum = await fb.database().ref(`/artists/${id}/albums/${album.id}`).once('value');
      // if the album exists in the database append some extra info
      if (fbAlbum.val()) {

        album.available = true;
        album.path = fbAlbum.val().path;
        album.tracks = fbAlbum.val().tracks;

      } else {
        // if the album doesn't exist fetch it's tracks from Tidal
        album.available = false;
        const tracks = await tidal.getAlbumTracks(album.id);
        album.tracks = tracks;

      }
      // parse the album cover
      album.cover = tidal.albumArtToUrl(album.cover);
      return album;
    });

    // parse the artist picture
    if (artist.picture) {

      artist.picture = tidal.artistPicToUrl(artist.picture);

    } else {
      // if the artist does not have a picture use Tidal's stock artist picture
      artist.picture = {
        sm: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
        md: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
        lg: 'https://listen.tidal.com/defaultArtistImage.983243.svg',
      };

    }

    const data = {
      ...artist,
      albums: allAlbums,
      topTracks,
    };

    dispatch(receiveArtistInfo(data));

  } catch (e) {

    dispatch(errorArtistInfo());
  }
};

export default fetchArtistInfo;
