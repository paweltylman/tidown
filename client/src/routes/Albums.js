import React from 'react';
import AlbumSearch from '../containers/AlbumSearch';
import RecentAlbums from '../containers/RecentAlbums';

const Albums = () => (

  <div>

    <div className="md-grid">
      <div className="md-cell--12">
        <AlbumSearch />
      </div>
    </div>

    <RecentAlbums />

  </div>
);

export default Albums;
