import React from 'react';
import ArtistSearch from '../containers/ArtistSearch';
import RecentArtists from '../containers/RecentArtists';


const Artists = () => (
  <div>

    <div className="md-grid">
      <div className="md-cell--12">
        <ArtistSearch />
      </div>
    </div>

    <RecentArtists />
  </div>
);

export default Artists;
