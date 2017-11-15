import React, { Component } from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import SimpleDownloadButton from './SimpleDownloadButton';

export default ({ tracks, available }) => (
  <DataTable plain>
    <TableHeader>
      <TableRow>
        <TableColumn>Title</TableColumn>
        <TableColumn>Album</TableColumn>
        <TableColumn>Download</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
          tracks.map(track => (
            <TableRow key={track.id}>
              <TableColumn className="tt-title">
                {track.title}
              </TableColumn>
              <TableColumn className="tt-album">
                {track.album.title}
              </TableColumn>
              <TableColumn className="tt-button">
                <SimpleDownloadButton track={track} available={available} />
              </TableColumn>
            </TableRow>
          ))
        }
    </TableBody>
  </DataTable>
);
