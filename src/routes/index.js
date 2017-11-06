import React from 'react';
import { Route } from 'react-router';
import Navdrawer from '../containers/Navdrawer';
import ArtistSearch from '../containers/ArtistSearch';

export default () => (
  <div>
    <Navdrawer>
      <Route
        exact
        path="/artist"
        component={ArtistSearch}
      />
    </Navdrawer>
  </div>
);
