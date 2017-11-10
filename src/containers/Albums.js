import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { CircularProgress } from 'react-md';
import Album from '../components/Album';

class ArtistAlbums extends Component {

  render() {

    const { albums, available, queue } = this.props;

    const loading = (
      <CircularProgress
        scale={4}
        id="loading-spinner"
      />
    );

    const error = (
      <h4 className="md-text-center">An error occured. Try searching and selecting an artist again.</h4>
    );

    if (albums.loading) {
      return loading;
    } else if (albums.error) {
      return error;
    } else if (albums.data) {
      return albums.data.map(album =>
        (
          <Album
            album={album}
            key={album.id}
            available={
              available !== null && available.hasOwnProperty(album.id) ? available[album.id] : false
            }
            queued={queue !== null && queue.hasOwnProperty(album.id)}
          />
        ));
    }

    return null;

  }

}

const fbArtistAlbums = firebaseConnect([
  {
    path: '/albums/queue',
    storeAs: 'queue',
  },
  {
    path: '/albums/available',
    storeAs: 'available',
  },
])(ArtistAlbums);

const mapStateToProps = state => ({
  albums: state.albums,
  available: state.firebase.data.available,
  queue: state.firebase.data.queue,
});

export default connect(mapStateToProps, null)(fbArtistAlbums);
