import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchArtistAlbums from '../actions/fetchArtistAlbums';
import fetchArtistInfo from '../actions/fetchArtistInfo';
import AlbumResults from '../containers/AlbumResults';
import Spinner from '../components/Spinner';
import TrackList from '../components/TrackList';

class SingleArtist extends Component {

  componentDidMount() {

    const { id } = this.props.match.params;

    this.props.fetchArtistAlbums(id);
    this.props.fetchArtistInfo(id);
  }

  render() {

    const { artist } = this.props;

    if (artist.data) {

      return (
        <div>
          <div style={{ marginTop: 40 }}>
            <div className="md-grid">
              <h1 className="md-cell--12 md-text-center artist-header">
                {artist.data.name}
              </h1>
            </div>
            <div className="md-grid">
              <h1 className="md-cell--12">
                Top Tracks
              </h1>
            </div>
            <TrackList tracks={artist.data.topTracks} />
            <div className="md-grid">
              <h1 className="md-cell--12">
                Albums
              </h1>
            </div>
            <AlbumResults />
          </div>
        </div>
      );
    }

    return (
      <Spinner />
    );
  }
}

const mapStateToProps = state => ({
  artist: state.artist,
});

const mapDispatchToProps = {
  fetchArtistInfo,
  fetchArtistAlbums,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleArtist);
