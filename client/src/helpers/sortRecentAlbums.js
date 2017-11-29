import _ from 'lodash';

// sorts recent albums from firebase and limits to first 20

const sortRecentAlbums = (recentArtists) => {

  let recentAlbums = [];

  recentArtists.forEach((artist) => {
    const { albums } = artist.value;
    Object.keys(albums).forEach(key => recentAlbums.push(albums[key]));
  });

  recentAlbums = _.sortBy(recentAlbums, 'downloaded').reverse();
  recentAlbums = recentAlbums.splice(0, 20);
  return recentAlbums;
};

export default sortRecentAlbums;

