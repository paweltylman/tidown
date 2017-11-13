import Tidal from 'tidal-api-wrapper';
import axios from 'axios';
import _ from 'lodash';
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

    const tabs = res.data.rows[0].modules[0].tabs;

    const newAlbums = _.find(tabs, tab => tab.title === 'New').pagedList.items;
    const staffPicks = _.find(tabs, tab => tab.title === 'Staff Picks').pagedList.items;
    const topAlbums = _.find(tabs, tab => tab.title === 'Top 20').pagedList.items;

    const albums = {
      newAlbums,
      staffPicks,
      topAlbums,
    };

    Object.keys(albums).forEach((property) => {
      albums[property].forEach((album) => {
        album.cover = tidal.albumArtToUrl(album.cover);
      });
    });

    dispatch(receiveNewAlbums(albums));

  } catch (e) {

    dispatch(errorNewAlbums(e));

  }

};

export default fetchNewAlbums;
