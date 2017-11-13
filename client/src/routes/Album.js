import React from 'react';
import AlbumSearch from '../containers/AlbumSearch';
import AlbumResults from '../containers/AlbumResults';

export default () => (
  <div>
    <div className="md-grid">
      <div className="md-cell md-cell--8-desktop centered">
        <AlbumSearch />
      </div>
    </div>
    <AlbumResults />
  </div>
);
