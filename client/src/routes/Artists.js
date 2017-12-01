import React from 'react';
import { connect } from 'react-redux';
import ArtistSearch from '../containers/ArtistSearch';
import RecentArtists from '../containers/RecentArtists';


const Artist = ({ albums }) => (
  <div>

    <div className="md-grid">
      <div className="md-cell--12">
        <ArtistSearch />
      </div>
    </div>

    <RecentArtists />
  </div>
);

const mapStateToProps = state => ({
  albums: state.albums,
});

export default connect(mapStateToProps)(Artist);
