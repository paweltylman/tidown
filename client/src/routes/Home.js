import React from 'react';
import { Divider } from 'react-md';

export default () => (

  <div>

    <div className="md-cell--12 md-text-container title">
      <h1 className="md-text-center">Welcome to Tidown</h1>
    </div>

    <Divider className="divider-large" />

    <div className="md-text-container">
      <p className="large-p md-text-center">
      Tidown allows you to download music from Tidal Music. You can download
      music to your computer or if you are a member of my Plex server you can
      add music to Plex and stream from there. To get started, search for an artist
      or album. If you cant find what you are looking for, it may not be available
      on Tidal. Let me know and I will see if it can be added to Plex.
      </p>
    </div>

  </div>
);
