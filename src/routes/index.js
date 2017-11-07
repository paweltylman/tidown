import React from 'react';
import { Route } from 'react-router';
import Navdrawer from '../containers/Navdrawer';
import Artist from './artist';

export default () => (
  <div>
    <Navdrawer>
      <Route
        exact
        path="/artist"
        component={Artist}
      />
    </Navdrawer>
  </div>
);
