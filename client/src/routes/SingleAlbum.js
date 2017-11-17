import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAlbum from '../actions/fetchAlbum';
import BackArrow from '../components/BackArrow';
import AlbumResults from '../containers/AlbumResults';

class SingleAlbum extends Component {

  componentWillMount() {

    const { id } = this.props.match.params;
    this.props.fetchAlbum(id);
  }

  render() {
    return (
      <div>
        <div style={{ margin: '20px 0px 40px 10px' }}>
          <BackArrow />
        </div>
        <AlbumResults />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAlbum,
};

export default connect(null, mapDispatchToProps)(SingleAlbum);
