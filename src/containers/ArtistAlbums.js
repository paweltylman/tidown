import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'react-md';
import Album from '../components/Album';

const ArtistAlbums = (props) => {

  const loading = (
    <CircularProgress
      scale={4}
      id="loading-spinner"
    />
  );

  const error = (
    <h4>An error occured. Try searching and selecting an artist again.</h4>
  );

  if (props.selectedArtist.loading) {
    return loading;
  } else if (props.selectedArtist.error) {
    return error;
  } else if (props.selectedArtist.data.albums) {
    return props.selectedArtist.data.albums.map(album =>
      (<Album album={album} key={album.id} />));
  }

  return null;

};

const mapStateToProps = state => ({
  selectedArtist: state.selectedArtist,
});

export default connect(mapStateToProps, null)(ArtistAlbums);
