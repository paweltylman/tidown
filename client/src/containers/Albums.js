import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { CircularProgress } from 'react-md';
import Album from '../components/Album';
import SimpleAlbum from '../components/SimpleAlbum';
import fetchNewAlbums from '../actions/fetchNewAlbums';

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
    }

    if (!isLoaded(available) || !isLoaded(queue)) {
      return null;
    }

    if (albums.error) { return error; }

    if (albums.data.length > 0) {

      return (
        <div>
          {
            albums.newAlbums ? (
              <h1 style={{ marginTop: 40, marginLeft: 12 }}>New Releases:</h1>
            ) : null
          }
          <div className="md-grid">
            {
            albums.data.map((album) => {

              const isAvailable = !isEmpty(available) && available.hasOwnProperty(album.id);
              const isQueued = !isEmpty(queue) && queue.hasOwnProperty(album.id);

              if (albums.newAlbums) {
                return (
                  <SimpleAlbum
                    album={isAvailable ? available[album.id] : album}
                    key={album.id}
                    available={isAvailable}
                    queued={isQueued}
                  />
                );
              }

              return (
                <Album
                  album={isAvailable ? available[album.id] : album}
                  key={album.id}
                  available={isAvailable}
                  queued={isQueued}
                />
              );

            })
          }
          </div>
        </div>
      );

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

const mapDispatchToProps = {
  fetchNewAlbums,
};

export default connect(mapStateToProps, mapDispatchToProps)(fbArtistAlbums);
