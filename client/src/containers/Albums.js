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
      <h4 className="md-text-container">
        An error occured. Try searching and selecting an artist again.
      </h4>
    );

    if (albums.loading) {
      return loading;
    } else if (albums.error) {
      return error;
    } else if (albums.data) {
      return albums.data.map((album) => {

        const isAvailable = available !== null && available.hasOwnProperty(album.id);
        const isQueued = queue !== null && queue.hasOwnProperty(album.id);

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
