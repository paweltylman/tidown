import React from 'react';
import ArtistSearch from '../containers/ArtistSearch';
import AlbumResults from '../containers/AlbumResults';


export default () => (
  <div>
    <div className="md-grid">
      <div className="md-cell md-cell--8-desktop centered">
        <ArtistSearch />
      </div>
    </div>
    <div className="md-grid">
      <AlbumResults />
    </div>
  </div>
);
