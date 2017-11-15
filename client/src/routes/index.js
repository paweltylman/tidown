import React from 'react';
import { Route } from 'react-router';
import Navdrawer from '../containers/Navdrawer';
import ScrollToTop from '../components/ScrollToTop';
import Home from './Home';
import Artists from './Artists';
import Albums from './Albums';
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
          component={Artists}
        />
        <Route
          exact
          path="/albums"
          component={Albums}
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
