import _ from 'lodash';

// filters duplicate albums from Tidal

const filterAlbums = (albums) => {
  // prefer explicit
  let filteredAlbums = _.sortBy(albums, 'explicit').reverse();
  // remove duplicate titles
  filteredAlbums = _.uniqBy(filteredAlbums, t => t.title.toLowerCase());
  // sort back by year
  filteredAlbums = _.sortBy(filteredAlbums, 'releaseDate').reverse();
  return filteredAlbums;
};

export default filterAlbums;
