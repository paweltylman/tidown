import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { CircularProgress } from 'react-md';
import Album from '../components/Album';
import SimpleAlbum from '../components/SimpleAlbum';

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
      <h4 className="md-text-container">
        An Error Occurred
      </h4>
    );

    if (albums.loading) {
      return loading;
    }

    if (!isLoaded(available) || !isLoaded(queue)) {
      return null;
    }

    if (albums.error) { return error; }

    return albums.data.map((album) => {

      const isAvailable = !isEmpty(available) && available.hasOwnProperty(album.id);
      const isQueued = !isEmpty(queue) && queue.hasOwnProperty(album.id);

      return (
        <Album
          album={isAvailable ? available[album.id] : album}
          key={album.id}
          available={isAvailable}
          queued={isQueued}
        />
      );

    });

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
