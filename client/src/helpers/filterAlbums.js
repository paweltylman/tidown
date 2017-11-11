import _ from 'lodash';

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
