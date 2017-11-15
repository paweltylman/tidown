import React from 'react';
import { connect } from 'react-redux';
import AlbumSearch from '../containers/AlbumSearch';
import AlbumResults from '../containers/AlbumResults';
import RecentAlbums from '../containers/RecentAlbums';

const Album = ({ albums }) => (
  <div>

    <div className="md-grid">
      <div className="md-cell--12">
        <AlbumSearch />
      </div>
    </div>

    <div>
      {
        albums.loading || albums.data.length > 0 ? (
          <AlbumResults />
        ) : (<RecentAlbums />)
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  albums: state.albums,
});

export default connect(mapStateToProps, null)(Album);
