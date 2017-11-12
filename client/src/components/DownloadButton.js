import React, { Component } from 'react';
import { saveAs } from 'file-saver';
import qs from 'querystring';
import Button from './RaisedButton';
import api from '../helpers/api';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4321';

export default class DownloadButton extends Component {

  state = {
    processing: false,
    error: false,
  }

  downloadLocal = async () => {

    try {

      const { available } = this.props;
      let { album } = this.props;

      if (!available) {

        this.setState({ processing: true });

        const res = await api({
          method: 'POST',
          url: '/download/album/temporary',
          data: {
            id: this.props.album.id,
          },
        });

        album = res.data.album; // eslint-disable-line prefer-destructuring

        this.setState({ processing: false });

      }

      // create link and download zip
      const a = document.createElement('a');
      a.href = `${baseURL}/download/album/${available ? 'available' : 'temporary'}?id=${album.id}`;
      a.download = `${album.artist.name} - ${album.title}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (e) {

      this.setState({ processing: false, error: true });

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
