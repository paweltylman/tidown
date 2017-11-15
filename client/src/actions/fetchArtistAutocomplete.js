import Tidal from 'tidal-api-wrapper';
import * as types from './types';

const tidal = new Tidal();

const requestArtists = () => ({
  type: types.REQ_ARTISTS,
});

const receiveArtists = artists => ({
  type: types.REC_ARTISTS,
  payload: artists,
});

const errorArtists = e => ({
  type: types.ERR_ARTISTS,
  payload: e,
});

const fetchArtists = query =>
  async (dispatch) => {

    dispatch(requestArtists());

    try {

      const artists = await tidal.search(query, 'artists', 10);

      // transform picture uuid to valid link
      artists.forEach((artist) => {
        if (artist.picture) {
          artist.picture = tidal.artistPicToUrl(artist.picture);
        }
      });

      dispatch(receiveArtists(artists));

    } catch (e) {

      dispatch(errorArtists(e));

    }
  };

export default fetchArtists;
