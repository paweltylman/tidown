import React from 'react';
import { List, ListItem } from 'react-md';
import SimpleDownloadButton from './SimpleDownloadButton';

export default ({ tracks, available, num }) => (

  <List>
    {
      tracks.map((track) => {

        const trackNum = track.trackNumber < 10 ? `0${track.trackNumber}` : `${track.trackNumber}`;

        return (
          <ListItem
            key={track.id}
            primaryText={num ? `${trackNum}. ${track.title}` : track.title}
            secondaryText={track.album.title}
            rightIcon={<SimpleDownloadButton track={track} available={available} />}
          />
        );
      })
    }
  </List>

);
