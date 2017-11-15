import React, { Component } from 'react';
import { Button } from 'react-md';
import api from '../helpers/api';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4321';

export default class SimpleDownloadButton extends Component {

  state = {
    processing: false,
    error: false,
  }

  downloadTrack = async (track) => {

    const { available } = this.props;

    this.setState({ processing: true });

    try {

      if (!available) {
        const res = await api({
          method: 'POST',
          url: '/download/track/temporary',
          data: {
            id: track.id,
          },
        });

        track = res.data;
      }

    } catch (e) {

      this.setState({
        processing: false,
        error: true,
      });

    }

    // create link and download zip
    const a = document.createElement('a');
    a.href = `${baseURL}/download/track/${available ? 'available' : 'temporary'}?id=${track.id}`;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.setState({ processing: false });

  }

  render() {

    const { track } = this.props;

    const { error, processing } = this.state;

    return (

      <Button
        secondary
        icon
        iconClassName={
          processing ?
            'fa fa-spinner fa-pulse mini-icon'
           : error ?
            'fa fa-exclamation-triangle mini-icon'
           : 'fa fa-download mini-icon'
        }
        onClick={() => this.downloadTrack(track)}
      />
    );
  }
}
