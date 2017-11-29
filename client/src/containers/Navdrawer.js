import React, { Component } from 'react';
import { NavigationDrawer, FontIcon } from 'react-md';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import UpArrow from '../components/UpArrow';
import clearAlbums from '../actions/clearAlbums';

const navItems = [{
  key: 'artist',
  primaryText: 'Artists',
  leftIcon: <FontIcon>person</FontIcon>,
  path: '/artists',
}, {
  key: 'album',
  primaryText: 'Albums',
  leftIcon: <FontIcon>album</FontIcon>,
  path: '/albums',
}];

class Navdrawer extends Component {

  constructor() {
    super();

    // Update the items so they have an onClick handler to change the current page
    this.navItems = navItems.map(item => ({
      ...item,
      onClick: () => {
        this.props.push(item.path);
      },
    }));
  }

  render() {
    return (
      <div>
        <NavigationDrawer
          navItems={this.navItems}
          tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
          desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
          drawerTitle="Menu"
          toolbarTitle="Tidown"
          contentId="content"
          contentClassName="md-grid"
        >
          {this.props.children}
          <UpArrow />
        </NavigationDrawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  path: state.router.location.pathname,
});

const mapDispatchToProps = {
  push,
  clearAlbums,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navdrawer);
