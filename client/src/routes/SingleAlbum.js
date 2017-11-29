import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAlbum from '../actions/fetchAlbum';
import BackArrow from '../components/BackArrow';
import Albums from '../components/Albums';
import Spinner from '../components/Spinner';

class SingleAlbum extends Component {

  componentWillMount() {

    const { id } = this.props.match.params;
    this.props.fetchAlbum(id);
  }

  render() {

    const { albums } = this.props;

    if (albums.loading || !albums.data.length > 0) {
      return (
        <Spinner />
      );
    }

    return (
      <div>

        <BackArrow />

        <Albums albums={albums.data} />

      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAlbum,
};

const mapStateToProps = state => ({
  albums: state.albums,
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum);
