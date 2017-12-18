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

export default class SimpleAlbum extends Component {

  state = {
    downloading: false,
    processing: false,
    available: false,
    plexError: false,
    downloadError: false,
  }

  addToPlex = async () => {

    const { album } = this.props;

    if (!album.path && !this.state.downloading) {
      this.setState({ downloading: true });

      try {

        await api({
          method: 'POST',
          url: '/plex/album',
          data: {
            album: this.props.album,
          },
        });

        this.setState({
          available: true,
          downloading: false,
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

    const { album } = this.props;
    let { path } = album;

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

        path = res.data.album.path; // eslint-disable-line prefer-destructuring

        this.setState({ processing: false });
      } catch (e) {

        this.setState({ processing: false, downloadError: true });

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

    const { album, isQueued } = this.props;
    const {
      downloading,
      processing,
      available,
      plexError,
      downloadError,
    } = this.state;

    const artist = (
      <Link to={`/artist/${album.artists[0].id}`} className="simple-artist">
        {album.artists[0].name}
      </Link>
    );

    return (
      <div className="md-cell md-cell--3-desktop">
        <Card>
          <Media aspectRatio="1-1">
            <Link to={`/album/${album.id}`}>
              <img src={album.cover.lg} alt="Album Art" />
            </Link>
            <MediaOverlay>
              <CardTitle title={artist} subtitle={album.title}>
                <Button
                  className="md-cell--right"
                  tooltipLabel={
                    (album.path || available) ? 'Available On Plex' :
                      downloading || isQueued ? 'Adding To Plex' :
                        plexError ? 'Error' :
                        'Add To Plex'
                  }
                  tooltipPosition="top"
                  icon
                  iconClassName={
                    album.path ? (
                      'fa fa-check'
                    ) : downloading || isQueued ? (
                      'fa fa-spinner fa-pulse'
                    ) : plexError ? (
                      'fa fa-exclamation-triangle'
                    ) : 'fa fa-cloud-upload'
                  }
                  onClick={() => this.addToPlex()}
                />
                <Button
                  className="md-cell--right album-button"
                  tooltipLabel={
                    processing ? 'Processing'
                    : downloadError ? 'Error'
                    : 'Download'
                  }
                  tooltipPosition="top"
                  icon
                  iconClassName={
                    processing ? (
                      'fa fa-spinner fa-pulse'
                    ) : downloadError ? (
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
