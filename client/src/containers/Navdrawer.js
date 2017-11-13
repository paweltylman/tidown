import React, { Component } from 'react';
import { NavigationDrawer, FontIcon } from 'react-md';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
}, {
  key: 'releases',
  primaryText: 'New Releases',
  leftIcon: <FontIcon>library_music</FontIcon>,
  path: '/releases',
}];

class Navdrawer extends Component {
  constructor() {
    super();

    // Update the items so they have an onClick handler to change the current page
    this.navItems = navItems.map(item => ({
      ...item,
      onClick: () => {
        if (item.path !== this.props.path) {
          this.props.clearAlbums();
        }
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
