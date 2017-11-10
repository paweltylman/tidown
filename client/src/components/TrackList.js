import React from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';

export default ({ tracks }) => (
  <DataTable plain>
    <TableHeader>
      <TableRow>
        <TableColumn>Number</TableColumn>
        <TableColumn>Title</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        tracks.map(track => (
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
);
