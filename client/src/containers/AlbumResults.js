import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Album from '../components/Album';
import Spinner from '../components/Spinner';
import GenericError from '../components/GenericError';

class ArtistAlbums extends Component {

  render() {

    const { albums, available, queue } = this.props;

    if (!isLoaded(available) || !isLoaded(queue)) {
      return null;
    }

    if (albums.loading) {
      return <Spinner />;
    }

    if (albums.error) { return (<GenericError />); }

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
