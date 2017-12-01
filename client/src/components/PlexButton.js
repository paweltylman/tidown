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

      await api({
        method: 'POST',
        url: '/plex/album',
        data: {
          album: this.props.album,
        },
      });

    } catch (e) {

      this.setState({
        error: true,
        downloading: false,
      });

    }

  }

  render() {

    const { album, isQueued } = this.props;
    const { downloading, error } = this.state;

    if (album.path) {
      return (<Button disabled text="Available On Plex" />);
    } else if (downloading || isQueued) {
      return (<Button disabled text="Adding To Plex" />);
    } else if (error) {
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
