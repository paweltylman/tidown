import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import DownloadButton from '../components/DownloadButton';

class AlbumDownloadButton extends Component {

  downloadAlbum = (album) => {
    const { set } = this.props.firebase;
    set(`/albums/queue/tasks/${album.id}`, album);
  }

  render() {

    const { album, queuedAlbums, downloaded } = this.props;

    // wait for firebase queue to be loaded
    if (!isLoaded(queuedAlbums) || !isLoaded(downloaded)) {
      return null;
    }

    // if the queue is empty than everything should have a download button (for now)
    if (isEmpty(queuedAlbums) && isEmpty(downloaded)) {
      return (
        <DownloadButton text="Download" onClick={() => { this.downloadAlbum(album); }} />
      );
    }

    if (downloaded && downloaded[album.id]) {
      return (
        <DownloadButton text="Available" disabled />
      );
    }

    if (queuedAlbums && queuedAlbums[album.id]) {
      const queuedAlbum = queuedAlbums[album.id];
      if (queuedAlbum._state && queuedAlbum._state === 'in_progress') {
        return (
          <DownloadButton text="Downloading" disabled />
        );
      }
      return (
        <DownloadButton text="Added To Queue" disabled />
      );

    }

    return (
      <DownloadButton text="Download" onClick={() => { this.downloadAlbum(album); }} />
    );
  }
}

const fbAlbumDownloadButton = firebaseConnect([
  {
    path: 'albums/queue/tasks',
    storeAs: 'queuedAlbums',
  },
  {
    path: 'albums/downloads/',
    storeAs: 'downloaded',
  },
])(AlbumDownloadButton);

const mapStateToProps = (state => ({
  queuedAlbums: state.firebase.data.queuedAlbums,
  downloaded: state.firebase.data.downloaded,
}));

export default connect(mapStateToProps, null)(fbAlbumDownloadButton);
