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

    const { albums } = this.props;

    return (
      <div>
        <div style={{ margin: '20px 0px 40px 10px' }}>
          <BackArrow />
        </div>
        {
          albums.data.length === 1 ? (
            <h1 className="md-text-center">{albums.data[0].title}</h1>
          ) : null
        }
        <AlbumResults />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAlbum,
};

const mapStateToProps = state => ({
  albums: state.albums,
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum);
