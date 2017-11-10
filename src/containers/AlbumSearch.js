import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Autocomplete, Avatar } from 'react-md';
import { throttle } from 'lodash';
import fetchAlbumAutocomplete from '../actions/fetchAlbumAutocomplete';
import fetchAlbum from '../actions/fetchAlbum';

class AlbumSearch extends Component {

  handleChange = (value) => {
    this.search(value);
  }

  search = throttle((query) => {
    this.props.fetchAlbumAutocomplete(query);
  }, 500)

  handleAutocomplete = (value, index, matches) => {
    const { id } = matches[index];
    this.props.fetchAlbum(id);
  }

  render() {

    const data = this.props.albums.data.map(album => ({
      id: album.id,
      primaryText: `${album.title} - ${album.artist.name}`,
      key: album.id,
      leftAvatar: (<Avatar src={album.cover.sm} role="presentation" />),
    }));

    return (
      <Autocomplete
        id="album-search"
        label="Search For An Album"
        placeholder="Album Name"
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
  albums: state.albumAutocomplete,
});

const mapDispatchToProps = {
  fetchAlbumAutocomplete,
  fetchAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumSearch);
