import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from '../components/Spinner';
import SimpleAlbum from '../components/SimpleAlbum';

const RecentAlbums = ({ recentAlbums, available }) => {

  if (!isLoaded(recentAlbums)) {
    return (<Spinner />);
  }

  if (isEmpty(recentAlbums)) {
    return null;
  }

  const albums = recentAlbums.map(album => album.value).reverse();

  return (
    <div>
      <div className="md-grid" style={{ marginTop: 40, marginBottom: 20 }}>
        <div className="md-cell--12">
          <h1 className="blk">
          Recently Added
          </h1>
        </div>
      </div>
      <div className="md-grid">
        {
        albums.map((album) => {

          const isAvailable = !isEmpty(available) && available.hasOwnProperty(album.id);

          return (
            <SimpleAlbum
              album={isAvailable ? available[album.id] : album}
              key={album.id}
              available={isAvailable}
              className="md-cell"
            />
          );
        })
      }
      </div>
    </div>
  );
};

const fbRecentAlbums = firebaseConnect([
  {
    path: '/albums/available',
    storeAs: 'recentAlbums',
    queryParams: ['orderByChild=downloaded', 'limitToLast=20'],
  },
  {
    path: '/albums/available',
    storeAs: 'available',
  },
])(RecentAlbums);

const mapStateToProps = state => ({
  recentAlbums: state.firebase.ordered.recentAlbums,
  available: state.firebase.data.available,
});

export default connect(mapStateToProps, null)(fbRecentAlbums);
