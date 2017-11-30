import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Divider } from 'react-md';
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

        <TrackList tracks={artist.data.topTracks} />

        <Albums
          albums={artist.data.albums}
          title="Albums"
          showViewToggle
        />
      </div>
    );

  }
}

const mapStateToProps = state => ({
  artist: state.artist,
});

const mapDispatchToProps = {
  fetchArtistInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleArtist);
