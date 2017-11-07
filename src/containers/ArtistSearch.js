import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Autocomplete, Avatar, FontIcon } from 'react-md';
import throttle from 'lodash.throttle';
import fetchArtists from '../actions/fetch_artists';
import fetchArtistInfo from '../actions/fetch_artist_info';

class ArtistSearch extends Component {

  handleChange = (value) => {
    this.search(value);
  }

  search = throttle((query) => {
    this.props.fetchArtists(query);
  }, 500)

  handleAutocomplete = (value, index, matches) => {
    const { id } = matches[index];
    this.props.fetchArtistInfo(id);
  };

  render() {

    const data = this.props.artists.data.map(artist => ({
      ...artist,
      primaryText: artist.name,
      key: artist.id,
      leftAvatar: artist.picture ? (
        <Avatar src={artist.picture.sm} role="presentation" />
      ) : (
        <Avatar icon={<FontIcon>person</FontIcon>} role="presentation" />
      ),
    }));

    return (
      <Autocomplete
        id="artist-search"
        label="Search For An Artist"
        placeholder="Artist Name"
        data={data}
        filter={null}
        onChange={this.handleChange}
        onAutocomplete={this.handleAutocomplete}
        clearOnAutocomplete
        inputStyle={{ fontSize: 20 }}
        listStyle={{ fontSize: 20 }}
      />
    );
  }

}

const mapStateToProps = state => ({
  artists: state.artists,
});

const mapDispatchToProps = {
  fetchArtists,
  fetchArtistInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSearch);
