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
        <TableColumn>Number</TableColumn>
        <TableColumn>Title</TableColumn>
        <TableColumn>Download</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
          tracks.map(track => (
            <TableRow key={track.id}>
              <TableColumn>
                {track.trackNumber < 10 ? `0${track.trackNumber}.` : `${track.trackNumber}.`}
              </TableColumn>
              <TableColumn className="md-table-column--collapse">
                {track.title}
              </TableColumn>
              <TableColumn>
                <SimpleDownloadButton track={track} available={available} />
              </TableColumn>
            </TableRow>
          ))
        }
    </TableBody>
  </DataTable>
);
