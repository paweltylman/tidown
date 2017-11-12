import React from 'react';
import { Switch, Route } from 'react-router';
import Navdrawer from '../containers/Navdrawer';
import Home from './Home';
import Artist from './Artist';
import Album from './Album';

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
        path="/artist"
        component={Artist}
      />
      <Route
        exact
        path="/album"
        component={Album}
      />
    </Navdrawer>
  </div>
);
