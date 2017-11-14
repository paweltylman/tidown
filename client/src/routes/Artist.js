import React from 'react';
import { connect } from 'react-redux';
import ArtistSearch from '../containers/ArtistSearch';
import AlbumResults from '../containers/AlbumResults';
import RecentArtists from '../containers/RecentArtists';


const Artist = ({ albums }) => (
  <div>

    <div className="md-grid">
      <div className="md-cell md-cell--12-desktop centered">
        <ArtistSearch />
      </div>
    </div>

    <div>
      {
        albums.loading || albums.data.length > 0 ? (
          <AlbumResults />
        ) : (<RecentArtists />)
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  albums: state.albums,
});

export default connect(mapStateToProps, null)(Artist);
