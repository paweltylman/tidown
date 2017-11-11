import React, { Component } from 'react';
import Button from './RaisedButton';
import api from '../helpers/api';

export default class PlexButton extends Component {

  addToPlex = async () => {

    const res = await api({
      method: 'POST',
      url: '/plex/album',
      data: {
        album: this.props.album,
      },
    });

    return res.data.album;
  }

  render() {

    const { available, queued } = this.props;

    if (available) {
      return (<Button disabled text="Available On Plex" />);
    } else if (queued) {
      return (<Button disabled text="Adding To Plex" />);
    }

    return (
      <Button
        text="Add To Plex"
        handleClick={this.addToPlex}
      />
    );
  }
}
