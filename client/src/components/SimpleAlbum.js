import React, { Component } from 'react';
import {
  Card,
  CardTitle,
  Media,
  MediaOverlay,
  Button,
} from 'react-md';
import { Link } from 'react-router-dom';
import api from '../helpers/api';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4321';

export default class SimpleAlbum extends Component {

  state = {
    downloading: false,
    processing: false,
    plexError: false,
    downloadError: false,
  }

  addToPlex = async () => {

    if (!this.props.path) {
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
          plexError: true,
          downloading: false,
        });
      }

    }

  }

  downloadLocal = async () => {

    let { path } = this.props;
    const { album } = this.props;

    if (!path) {

      try {

        this.setState({ processing: true });

        const res = await api({
          method: 'POST',
          url: '/download/album',
          data: {
            id: album.id,
          },
        });

        path = res.data.path; // eslint-disable-line prefer-destructuring

        this.setState({ processing: false });
      } catch (e) {

        this.setState({ processing: false, downloadError: true });

      }

    }

    const params = `path=${path}&artist=${album.artist.name}&album=${album.title}`;
    const url = `${baseURL}/download/album/?${params}`;

    // create link and download
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  }

  render() {

    const { album } = this.props;

    return (
      <div className="md-cell">
        <Card>
          <Media aspectRatio="1-1">
            <Link to={`/album/${album.id}`}>
              <img src={album.cover.lg} alt="Album Art" />
            </Link>
            <MediaOverlay>
              <CardTitle title={album.artists[0].name} subtitle={album.title}>
                <Button
                  className="md-cell--right"
                  tooltipLabel={
                    album.path ? 'Available On Plex' :
                      this.state.downloading ? 'Adding To Plex' :
                        this.state.plexError ? 'Error' :
                        'Add To Plex'
                  }
                  tooltipPosition="top"
                  icon
                  iconClassName={
                    album.path ? (
                      'fa fa-check'
                    ) : this.state.downloading ? (
                      'fa fa-spinner fa-pulse'
                    ) : this.state.plexError ? (
                      'fa fa-exclamation-triangle'
                    ) : 'fa fa-cloud-upload'
                  }
                  onClick={() => this.addToPlex()}
                />
                <Button
                  className="md-cell--right album-button"
                  tooltipLabel={
                    this.state.processing ? 'Processing' :
                    this.state.downloadError ? 'Error' :
                    'Download'
                  }
                  tooltipPosition="top"
                  icon
                  iconClassName={
                    this.state.processing ? (
                      'fa fa-spinner fa-pulse'
                    ) : this.state.downloadError ? (
                      'fa fa-exclamation-triangle'
                    ) : 'fa fa-download'
                  }
                  onClick={() => this.downloadLocal()}
                />
              </CardTitle>
            </MediaOverlay>
          </Media>
        </Card>
      </div>
    );
  }
}
