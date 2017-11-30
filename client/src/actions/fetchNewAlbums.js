import Tidal from 'tidal-api-wrapper';
import axios from 'axios';
import _ from 'lodash';
import { fb } from '../store';
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

    const { tabs } = res.data.rows[0].modules[0];

    const newAlbums = _.find(tabs, tab => tab.title === 'New').pagedList.items;
    const staffPicks = _.find(tabs, tab => tab.title === 'Staff Picks').pagedList.items;
    const topAlbums = _.find(tabs, tab => tab.title === 'Top 20').pagedList.items;

    const albums = {
      newAlbums,
      staffPicks,
      topAlbums,
    };

    Object.keys(albums).forEach((property) => {

      albums[property].forEach(async (album) => {

        album.cover = tidal.albumArtToUrl(album.cover);

        // check if the album exists in the database
        const fbAlbum = await fb.database().ref(`/artists/${album.artist.id}/albums/${album.id}`);

        if (fbAlbum.val()) {

          album.path = fbAlbum.val().path;
          album.tracks = fbAlbum.val().tracks;

        } else {

          const tracks = await tidal.getAlbumTracks(album.id);
          album.tracks = tracks;

        }
      });
    });

    dispatch(receiveNewAlbums(albums));

  } catch (e) {

    dispatch(errorNewAlbums(e));

  }

};

export default fetchNewAlbums;
