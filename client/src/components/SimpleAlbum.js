import React, { Component } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  Media,
  MediaOverlay,
  Button,
  FontIcon,
  CircularProgress,
} from 'react-md';
import api from '../helpers/api';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4321';

export default class SimpleAlbum extends Component {

  state = {
    downloading: false,
    processing: false,
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

    } catch (e) {

      this.setState({
        error: true,
        downloading: false,
      });
    }
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

    const { album, available, queued } = this.props;

    return (
      <Card className="md-cell">
        <Media aspectRatio="1-1">
          <img src={album.cover.lg} alt="Album Art" />
          <MediaOverlay>
            <CardTitle title={album.artists[0].name} subtitle={album.title}>
              <Button
                className="md-cell--right"
                tooltipLabel={
                  available ? 'Available On Plex' :
                    this.state.downloading ? 'Adding To Plex' :
                      'Add To Plex'
                }
                tooltipPosition="top"
                icon
                iconClassName={
                  available ? (
                    'fa fa-check'
                  ) : this.state.downloading || queued ? (
                    'fa fa-spinner fa-pulse'
                  ) : 'fa fa-cloud-upload'
                }
                onClick={() => this.addToPlex()}
              />
              <Button
                className="md-cell--right album-button"
                tooltipLabel={
                  this.state.processing ? 'Processing' : 'Download'
                }
                tooltipPosition="top"
                icon
                iconClassName={
                  this.state.processing ? (
                    'fa fa-spinner fa-pulse'
                  ) : 'fa fa-download'
                }
                onClick={() => this.downloadLocal()}
              />
            </CardTitle>
          </MediaOverlay>
        </Media>
      </Card>
    );
  }
}
