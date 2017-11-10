import React from 'react';
import {
  Paper,
  Media,
  Divider,
} from 'react-md';
import TrackList from './TrackList';
import PlexButton from './PlexButton';
import DownloadButton from './DownloadButton';

export default ({ album, available, queued }) => (
  <Paper className="md-cell md-cell--12 md-grid">

    <section className="md-cell md-cell--3-tablet md-cell--4-desktop">

      <Media aspectRatio="1-1">
        <img
          src={album.cover.xl}
          alt="album art"
        />
      </Media>

      <p className="album-header md-display-2 md-text-center">{album.artist.name}</p>

      <Divider style={{ marginBottom: 20, marginTop: 20 }} />

      <p className="album-header md-display-1 md-text-center">{album.title}</p>
      <p className="album-header md-display-1 md-text-center">{album.releaseDate.substring(0, 4)}</p>

      <Divider style={{ marginBottom: 20, marginTop: 20 }} />

      <div className="md-grid">
        <div className="md-cell--12 download">
          <PlexButton available={available} queued={queued} album={album} />
        </div>

        <div className="md-cell--12 download">
          <DownloadButton available={available} queued={queued} album={album} />
        </div>
      </div>

    </section>

    <section className="md-cell md-cell--5-tablet md-cell--8-desktop">
      <TrackList tracks={album.tracks} />
    </section>

  </Paper>
);
