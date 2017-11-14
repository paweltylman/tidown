import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Spinner from '../components/Spinner';
import ArtistCard from '../components/ArtistCard';

const RecentArtists = ({ recentArtists }) => {

  if (!isLoaded(recentArtists)) {
    return (<Spinner />);
  }

  if (isEmpty(recentArtists)) {
    return null;
  }

  return (
    <div>
      <div className="md-grid" style={{ marginTop: 40, marginBottom: 20 }}>
        <div className="md-cell--12">
          <h1>
          Recent Artists
          </h1>
        </div>
      </div>
      <div className="md-grid">
        {
        recentArtists.reverse().map(artist => (
          <ArtistCard artist={artist} key={artist.value.id} />
        ))
      }
      </div>
    </div>
  );
};

const fbRecentArtists = firebaseConnect([
  {
    path: '/artists',
    storeAs: 'recentArtists',
    queryParams: ['orderByChild=lastDownload', 'limitToLast=20'],
  },
])(RecentArtists);

const mapStateToProps = state => ({
  recentArtists: state.firebase.ordered.recentArtists,
});

export default connect(mapStateToProps, null)(fbRecentArtists);
