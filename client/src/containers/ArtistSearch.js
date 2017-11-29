import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Autocomplete, Avatar, FontIcon } from 'react-md';
import { throttle } from 'lodash';
import { push } from 'react-router-redux';
import fetchArtistAutocomplete from '../actions/fetchArtistAutocomplete';

class ArtistSearch extends Component {

  handleChange = (value) => {
    this.search(value);
  }

  search = throttle((query) => {
    this.props.fetchArtistAutocomplete(query);
  }, 500)

  handleAutocomplete = (value, index, matches) => {
    const { id } = matches[index];
    this.props.push(`/artist/${id}`);
  };

  render() {

    const data = this.props.artistAutocomplete.data.map(artist => ({
      id: artist.id,
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
  artistAutocomplete: state.artistAutocomplete,
});

const mapDispatchToProps = {
  fetchArtistAutocomplete,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSearch);
