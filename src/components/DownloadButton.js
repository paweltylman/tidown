import React, { Component } from 'react';
import { saveAs } from 'file-saver';
import Button from './RaisedButton';
import api from '../helpers/api';

export default class DownloadButton extends Component {

  state = {
    processing: false,
    error: false,
  }

  downloadLocal = async () => {

    try {

      this.setState({ processing: true });

      const { available } = this.props;
      const album = available || this.props.album;
      const zip = await api({
        method: 'POST',
        data: {
          album,
        },
        url: `/download/album/${available ? 'available' : 'unavailable'}`,
        responseType: 'blob',
      });

      saveAs(zip.data, `${album.artist.name} - ${album.title}`);

      this.setState({ processing: false });
    } catch (e) {
      this.setState({ error: true });
    }

  }
  render() {

    let text = 'Download';

    if (this.state.processing) {
      text = 'Processing';
    } else if (this.state.error) {
      text = 'Error';
    }
    return (
      <Button
        disabled={this.state.processing || this.state.error}
        text={text}
        handleClick={this.downloadLocal}
      />
    );
  }

}
