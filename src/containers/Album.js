import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'react-md';
import Album from '../components/Album';

class AlbumContainer extends Component {

  render() {
    const loading = (
      <CircularProgress
        scale={4}
        id="loading-spinner"
      />
    );

    const error = (
      <h4 className="md-text-center">An error occured. Try searching and selecting an album again.</h4>
    );

    if (this.props.selectedAlbum.loading) {
      return loading;
    } else if (this.props.selectedAlbum.error) {
      return error;
    } else if (this.props.selectedAlbum.data.id) {
      const album = this.props.selectedAlbum.data;
      return (
        <Album album={album} key={album.id} />
      );
    }

    return null;

  }

}

const mapStateToProps = state => ({
  selectedAlbum: state.selectedAlbum,
});

export default connect(mapStateToProps, null)(AlbumContainer);
