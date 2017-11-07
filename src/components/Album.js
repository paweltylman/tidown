import React from 'react';
import {
  Paper,
  Media,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Divider,
} from 'react-md';
import AlbumDownloadButton from '../containers/AlbumDownloadButton';

export default ({ album }) => (
  <Paper className="md-cell md-cell--12 md-grid">
    <section
      className="md-cell md-cell--3-tablet md-cell--4-desktop"
    >
      <Media
        aspectRatio="1-1"
      >
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
      <div className="md-text-center">
        <AlbumDownloadButton album={album} />
      </div>
    </section>
    <section className="md-cell md-cell--5-tablet md-cell--8-desktop">
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Number</TableColumn>
            <TableColumn>Title</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            album.tracks.map(track => (
              <TableRow key={track.id}>
                <TableColumn>
                  {track.trackNumber < 10 ? `0${track.trackNumber}.` : `${track.trackNumber}.`}
                </TableColumn>
                <TableColumn>{track.title}</TableColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </DataTable>
    </section>
  </Paper>
);
