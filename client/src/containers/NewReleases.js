import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import SimpleAlbum from '../components/SimpleAlbum';
import Spinner from '../components/Spinner';
import GenericError from '../components/GenericError';
import fetchNewAlbums from '../actions/fetchNewAlbums';

class NewReleases extends Component {

  componentWillMount() {
    this.props.fetchNewAlbums();
  }

  render() {

    const {
      newAlbums, available, queue, view,
    } = this.props;

    if (!isLoaded(available) || !isLoaded(queue)) {
      return null;
    }

    if (newAlbums.loading) {
      return (<Spinner />);
    }

    if (newAlbums.error) { return (<GenericError />); }

    const albums = newAlbums.data[view.value];

    return albums.map((album) => {

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

    });

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
