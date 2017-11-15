import React, { Component } from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import SimpleDownloadButton from './SimpleDownloadButton';

export default ({
  tracks, available, num, album,
}) => (
  <DataTable plain>
    <TableHeader>
      <TableRow>
        {
          num ? (
            <TableColumn>Number</TableColumn>
          ) : null
        }
        <TableColumn>Title</TableColumn>
        {
          album ? (
            <TableColumn>Album</TableColumn>
          ) : null
        }
        <TableColumn>Download</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
          tracks.map(track => (
            <TableRow key={track.id}>
              {
                num ? (
                  <TableColumn>
                    {track.trackNumber < 10 ? `0${track.trackNumber}.` : `${track.trackNumber}.`}
                  </TableColumn>
                ) : null
              }
              <TableColumn className="md-table-column--collapse">
                {track.title}
              </TableColumn>
              {
                album ? (
                  <TableColumn>
                    {track.album.title}
                  </TableColumn>
                ) : null
              }
              <TableColumn>
                <SimpleDownloadButton track={track} available={available} />
              </TableColumn>
            </TableRow>
          ))
        }
    </TableBody>
  </DataTable>
);
