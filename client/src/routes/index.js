import React from 'react';
import { Switch, Route } from 'react-router';
import Navdrawer from '../containers/Navdrawer';
import Home from './Home';
import Artist from './Artist';
import Album from './Album';
import Releases from './Releases';

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
        component={Artist}
      />
      <Route
        exact
        path="/albums"
        component={Album}
      />
      <Route
        exact
        path="/releases"
        component={Releases}
      />
    </Navdrawer>
  </div>
);
