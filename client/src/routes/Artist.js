import React from 'react';
import ArtistSearch from '../containers/ArtistSearch';
import Albums from '../containers/Albums';


export default () => (
  <div>
    <div className="md-grid">
      <div className="md-cell md-cell--8-desktop centered">
        <ArtistSearch />
      </div>
    </div>
    <div className="md-grid">
      <Albums />
    </div>
  </div>
);
