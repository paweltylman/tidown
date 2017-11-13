import React from 'react';
import { Route } from 'react-router';
import Navdrawer from '../containers/Navdrawer';
import ScrollToTop from '../components/ScrollToTop';
import Home from './Home';
import Artist from './Artist';
import Album from './Album';
import Releases from './Releases';

export default () => (
  <div>
    <Navdrawer>
      <ScrollToTop>
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
      </ScrollToTop>
    </Navdrawer>
  </div>
);
