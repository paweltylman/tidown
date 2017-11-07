import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Autocomplete, Avatar } from 'react-md';
import throttle from 'lodash.throttle';
import fetchAlbums from '../actions/fetchAlbums';
import fetchAlbumInfo from '../actions/fetchAlbumInfo';

class AlbumSearch extends Component {

  handleChange = (value) => {
    this.search(value);
  }

  search = throttle((query) => {
    this.props.fetchAlbums(query);
  }, 500)

  handleAutocomplete = (value, index, matches) => {
    const { id } = matches[index];
    this.props.fetchAlbumInfo(id);
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
  albums: state.albums,
});

const mapDispatchToProps = {
  fetchAlbums,
  fetchAlbumInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumSearch);
