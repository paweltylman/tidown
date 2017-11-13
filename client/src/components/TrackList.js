import React from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  FontIcon,
} from 'react-md';

export default ({ tracks }) => (
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
              <FontIcon
                iconClassName="fa fa-download mini-icon"
              />
            </TableColumn>
          </TableRow>
        ))
      }
    </TableBody>
  </DataTable>
);
