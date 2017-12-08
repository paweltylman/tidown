import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import fetchAlbum from '../actions/fetchAlbum';
import BackArrow from '../components/BackArrow';
import Albums from '../components/Albums';
import Spinner from '../components/Spinner';

// this is a crappy hack but helps limit the amount of data coming back from firebase
const transformAvailable = (availableAlbums) => {

  if (availableAlbums) {
    return {
      [availableAlbums.id]: availableAlbums,
    };
  }
  return {};

};

class SingleAlbum extends Component {

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchAlbum(id);
  }

  render() {

    const { albums, availableAlbums, queuedAlbums } = this.props;

    if (albums.loading || !albums.data.length > 0 || !isLoaded(albums) || !isLoaded(queuedAlbums)) {
      return (
        <Spinner />
      );
    }

    return (
      <div>

        <BackArrow />

        <Albums
          albums={albums.data}
          availableAlbums={transformAvailable(availableAlbums)}
          queuedAlbums={queuedAlbums}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums,
  availableAlbums: state.firebase.data.availableAlbums,
  queuedAlbums: state.firebase.data.queuedAlbums,
});

const mapDispatchToProps = {
  fetchAlbum,
};

export default compose(
  firebaseConnect((props, store) => [
    {
      path: `/albums/${props.match.params.id}`,
      storeAs: 'availableAlbums',
    },
    {
      path: '/queue',
      storeAs: 'queuedAlbums',
    },
  ]),
  connect(mapStateToProps, mapDispatchToProps),
)(SingleAlbum);
