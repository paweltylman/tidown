import React, { Component } from 'react';
import Button from './RaisedButton';
import api from '../helpers/api';

export default class DownloadButton extends Component {

  state = {
    processing: false,
    error: false,
  }

  downloadLocal = async () => {

    const { album } = this.props;
    let { path } = album;

    if (!album.available) {

      try {

        this.setState({ processing: true });

        const res = await api({
          method: 'POST',
          url: '/download/album',
          data: {
            id: album.id,
          },
        });

        path = res.data.album.path; // eslint-disable-line prefer-destructuring

        this.setState({ processing: false });
      } catch (e) {

        this.setState({ processing: false, error: true });

      }

    }

    const params = `path=${path}&artist=${album.artist.name}&album=${album.title}`;
    const url = `/download/album/?${params}`;

    // create link and download zip
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

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
