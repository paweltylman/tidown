import React, { Component } from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Button,
} from 'react-md';
import api from '../helpers/api';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4321';

export default class TrackList extends Component {

  downloadTrack = async (track) => {

    const { available } = this.props;

    if (!available) {
      const res = await api({
        method: 'POST',
        url: '/download/track/temporary',
        data: {
          id: track.id,
        },
      });

      track = res.data;
    }

    // create link and download zip
    const a = document.createElement('a');
    a.href = `${baseURL}/download/track/${available ? 'available' : 'temporary'}?id=${track.id}`;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  render() {

    const { tracks } = this.props;

    return (
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
                  <Button
                    secondary
                    icon
                    iconClassName="fa fa-download mini-icon"
                    onClick={() => this.downloadTrack(track)}
                  />
                </TableColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </DataTable>
    );
  }
}
