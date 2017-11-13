import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { CircularProgress } from 'react-md';
import SimpleAlbum from '../components/SimpleAlbum';
import fetchNewAlbums from '../actions/fetchNewAlbums';

class NewReleases extends Component {

  componentWillMount() {
    if (this.props.newAlbums.data.length === 0) {
      this.props.fetchNewAlbums();
    }
  }

  render() {

    const { newAlbums, available, queue } = this.props;

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

    if (newAlbums.loading) {
      return loading;
    }

    if (!isLoaded(available) || !isLoaded(queue)) {
      return null;
    }

    if (newAlbums.error) { return error; }

    const albums = newAlbums.data.newAlbums;

    if (albums) {
      return (
        <div className="md-grid">
          {
            albums.map((album) => {

              const isAvailable = !isEmpty(available) && available.hasOwnProperty(album.id);
              const isQueued = !isEmpty(queue) && queue.hasOwnProperty(album.id);

              return (
                <SimpleAlbum
                  album={isAvailable ? available[album.id] : album}
                  key={album.id}
                  available={isAvailable}
                  queued={isQueued}
                  className="md-cell"
                />
              );

            })
          }
        </div>
      );
    }

    return null;
  }
}

const fbNewReleases = firebaseConnect([
  {
    path: '/albums/queue',
    storeAs: 'queue',
  },
  {
    path: '/albums/available',
    storeAs: 'available',
  },
])(NewReleases);

const mapStateToProps = state => ({
  newAlbums: state.newAlbums,
  available: state.firebase.data.available,
  queue: state.firebase.data.queue,
});

const mapDispatchToProps = {
  fetchNewAlbums,
};

export default connect(mapStateToProps, mapDispatchToProps)(fbNewReleases);
