import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import sortRecentAlbums from '../helpers/sortRecentAlbums';
import AlbumSearch from '../containers/AlbumSearch';
import Albums from '../components/Albums';

const AlbumPage = ({ recentArtists }) => (

  <div>

    <div className="md-grid">
      <div className="md-cell--12">
        <AlbumSearch />
      </div>
    </div>
    {
        isLoaded(recentArtists) && !isEmpty(recentArtists) ? (
          <div>
            <Albums
              albums={sortRecentAlbums(recentArtists)}
              view="simple"
              title="Recently Added"
              showViewToggle
            />
          </div>
        ) : null
      }
  </div>
);

const fbAlbumPage = firebaseConnect([
  {
    path: '/artists',
    storeAs: 'recentArtists',
    queryParams: ['orderByChild=lastDownload', 'limitToLast=20'],
  },
])(AlbumPage);

const mapStateToProps = state => ({
  recentArtists: state.firebase.ordered.recentArtists,
});

export default connect(mapStateToProps, null)(fbAlbumPage);
