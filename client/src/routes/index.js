import React from 'react';
import { Route } from 'react-router';
import Navdrawer from '../containers/Navdrawer';
import Artist from './Artist';
import Album from './Album';

export default () => (
  <div>
    <Navdrawer>
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
