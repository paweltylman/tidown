import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'react-md';
import Album from '../components/Album';

class ArtistAlbums extends Component {

  render() {
    const loading = (
      <CircularProgress
        scale={4}
        id="loading-spinner"
      />
    );

    const error = (
      <h4 className="md-text-center">An error occured. Try searching and selecting an artist again.</h4>
    );

    if (this.props.selectedArtist.loading) {
      return loading;
    } else if (this.props.selectedArtist.error) {
      return error;
    } else if (this.props.selectedArtist.data.albums) {
      return this.props.selectedArtist.data.albums.map(album =>
        (<Album album={album} key={album.id} />));
    }

    return null;

  }

}

const mapStateToProps = state => ({
  selectedArtist: state.selectedArtist,
});

export default connect(mapStateToProps, null)(ArtistAlbums);
