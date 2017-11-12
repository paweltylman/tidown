import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'react-md';
import AlbumSearch from '../containers/AlbumSearch';
import Albums from '../containers/Albums';
import fetchNewAlbums from '../actions/fetchNewAlbums';

class AlbumRoute extends Component {

  componentDidMount() {
    this.props.fetchNewAlbums();
  }

  render() {
    return (
      <div>
        <div className="md-grid">
          <div className="md-cell md-cell--8-desktop centered">
            <AlbumSearch />
          </div>
        </div>
        <Albums />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchNewAlbums,
};

export default connect(null, mapDispatchToProps)(AlbumRoute);
