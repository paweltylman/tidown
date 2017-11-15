import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAlbum from '../actions/fetchAlbum';
import AlbumResults from '../containers/AlbumResults';

class SingleAlbum extends Component {

  componentWillMount() {

    const { id } = this.props.match.params;
    this.props.fetchAlbum(id);
  }

  render() {
    return (
      <AlbumResults />
    );
  }
}

const mapDispatchToProps = {
  fetchAlbum,
};

export default connect(null, mapDispatchToProps)(SingleAlbum);
