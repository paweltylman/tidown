import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from '../components/Spinner';
import Albums from '../components/Albums';

const RecentArtists = ({ recentAlbums }) => {

  if (!isLoaded(recentAlbums)) {
    return (<Spinner />);
  }

  if (isEmpty(recentAlbums)) {
    return null;
  }

  const albums = recentAlbums.map(album => album.value);

  return (
    <div>

      <Albums
        albums={albums}
        title="Recently Added"
        view="simple"
        showViewToggle
      />

    </div>
  );
};

const fbRecentAlbums = firebaseConnect([
  {
    path: '/albums',
    storeAs: 'recentAlbums',
    queryParams: ['orderByChild=downloaded', 'limitToLast=20'],
  },
])(RecentArtists);

const mapStateToProps = state => ({
  recentAlbums: state.firebase.ordered.recentAlbums,
});

export default connect(mapStateToProps)(fbRecentAlbums);
