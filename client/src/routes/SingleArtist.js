import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Divider, SelectField } from 'react-md';
import fetchArtistAlbums from '../actions/fetchArtistAlbums';
import fetchArtistInfo from '../actions/fetchArtistInfo';
import AlbumResults from '../containers/AlbumResults';
import Spinner from '../components/Spinner';
import TrackList from '../components/TrackList';

const viewItems = [{
  label: 'Expanded View',
  value: 'expanded',
}, {
  label: 'Simple View',
  value: 'simple',
}];

class SingleArtist extends Component {

  state = {
    view: viewItems[0],
  }

  componentDidMount() {

    const { id } = this.props.match.params;

    this.props.fetchArtistAlbums(id);
    this.props.fetchArtistInfo(id);
  }

  handleSelect = (value, index) => {
    this.setState({
      view: viewItems[index],
    });
  }

  render() {

    const { artist } = this.props;
    const simple = this.state.view.value === 'simple';

    if (artist.loading || !artist.data) {
      return (
        <Spinner />
      );
    }

    return (
      <div>
        <div style={{ marginTop: 40 }}>
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
          <div className="md-grid" style={{ marginTop: 40 }}>
            <h1 className="md-cell--12">
              Top Tracks
            </h1>
          </div>
          <TrackList tracks={artist.data.topTracks} />
          <Divider />
          <div className="md-grid" style={{ marginTop: 40 }}>
            <h1 className="md-cell--8-desktop md-cell--5-tablet md-cell--4-phone album-align">
            Albums
            </h1>
            <div className="md-cell--4-desktop md-cell--3-tablet md-cell--4-phone album-align md-cell--middle">
              <SelectField
                id="albums-view-select"
                menuItems={viewItems}
                position={SelectField.Positions.BELOW}
                fullWidth
                centered
                onChange={this.handleSelect}
                placeholder="Expanded View"
              />
            </div>
          </div>
          <div className="md-grid">
            <AlbumResults simple={simple} />
          </div>
        </div>
      </div>
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
