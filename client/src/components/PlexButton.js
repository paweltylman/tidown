import React, { Component } from 'react';
import Button from './RaisedButton';
import api from '../helpers/api';

export default class PlexButton extends Component {

  state = {
    downloading: false,
    error: false,
  }

  addToPlex = async () => {

    this.setState({ downloading: true });

    try {
      const res = await api({
        method: 'POST',
        url: '/plex/album',
        data: {
          album: this.props.album,
        },
      });

      return res.data.album;
    } catch (e) {

      return this.setState({
        error: true,
        downloading: false,
      });
    }
  }

  render() {

    const { available, queued } = this.props;

    if (available) {
      return (<Button disabled text="Available On Plex" />);
    } else if (queued || this.state.downloading) {
      return (<Button disabled text="Adding To Plex" />);
    } else if (this.state.error) {
      return (<Button disabled text="Error" />);
    }

    return (
      <Button
        text="Add To Plex"
        handleClick={this.addToPlex}
      />
    );
  }
}
