import React from 'react';
import AlbumSearch from '../containers/AlbumSearch';
import Album from '../containers/Album';

export default () => (
  <div>
    <div className="md-grid">
      <div className="md-cell md-cell--8-desktop centered">
        <AlbumSearch />
      </div>
    </div>
    <div className="md-grid">
      <Album />
    </div>
  </div>
);
