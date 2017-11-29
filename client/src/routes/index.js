import React from 'react';
import { Route } from 'react-router';
import Navdrawer from '../containers/Navdrawer';
import Home from './Home';
import Artists from './Artists';
import Albums from './Albums';
import SingleArtist from './SingleArtist';
import SingleAlbum from './SingleAlbum';

export default () => (
  <div>
    <Navdrawer>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        exact
        path="/artists"
        component={Artists}
      />
      <Route
        exact
        path="/albums"
        component={Albums}
      />
      <Route
        exact
        path="/artist/:id"
        component={SingleArtist}
      />
      <Route
        exact
        path="/album/:id"
        component={SingleAlbum}
      />
    </Navdrawer>
  </div>
);
