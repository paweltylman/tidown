import Tidal from 'tidal-api-wrapper';
import axios from 'axios';
import * as types from './types';

const tidal = new Tidal();

const requestNewAlbums = () => ({
  type: types.REQ_NEW_ALBUMS,
});

const receiveNewAlbums = albums => ({
  type: types.REC_NEW_ALBUMS,
  payload: albums,
});

const errorNewAlbums = e => ({
  type: types.ERR_NEW_ALBUMS,
  payload: e,
});

const fetchNewAlbums = () => async (dispatch) => {

  dispatch(requestNewAlbums());

  try {

    const base = 'https://api.tidal.com/v1/pages/show_more_featured_albums';
    const url = `${base}?locale=en_US&deviceType=BROWSER&countryCode=US`;

    const res = await axios({
      method: 'GET',
      url,
      headers: {
        'x-tidal-token': tidal.webToken,
      },
    });

    const newAlbums = res.data.rows[0].modules[0].tabs[0].pagedList.items;

    newAlbums.forEach((album) => {
      album.cover = tidal.albumArtToUrl(album.cover);
    });

    dispatch(receiveNewAlbums(newAlbums));

  } catch (e) {

    dispatch(errorNewAlbums(e));

  }

};

export default fetchNewAlbums;
