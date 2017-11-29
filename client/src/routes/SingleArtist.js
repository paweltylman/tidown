import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Avatar, Divider, SelectField } from 'react-md';
import fetchArtistAlbums from '../actions/fetchArtistAlbums';
import fetchArtistInfo from '../actions/fetchArtistInfo';
import BackArrow from '../components/BackArrow';
import Albums from '../components/Albums';
import Spinner from '../components/Spinner';
import TrackList from '../components/TrackList';

class SingleArtist extends Component {

  componentDidMount() {

    const { id } = this.props.match.params;

    this.props.fetchArtistInfo(id);
  }

  render() {

    const { artist, available } = this.props;

    if (artist.loading || !artist.data.name) {
      return (
        <Spinner />
      );
    }

    return (
      <div>
        <BackArrow />

        <div className="md-grid">
          <div className="md-cell--12 md-text-center">
            <Avatar
              src={artist.data.picture.lg}
              role="presentation"
              className="avatar-lg"
            />
            <h1
              className="artist-header"
            >
              {artist.data.name}
            </h1>
          </div>
        </div>

        <Divider />
        <Albums albums={artist.data.albums} available={available} title="Albums" />
      </div>
    );

  }
}

const mapStateToProps = state => ({
  artist: state.artist,
  albums: state.albums,
});

const mapDispatchToProps = {
  fetchArtistInfo,
  fetchArtistAlbums,
};

export default compose(
  firebaseConnect((props, store) => [
    {
      storeAs: 'available',
      path: `/artists/${props.match.params.id}/albums`,
    },
  ]),
  connect(mapStateToProps, mapDispatchToProps),
)(SingleArtist);
