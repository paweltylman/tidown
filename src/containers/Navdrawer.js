import React, { Component } from 'react';
import { NavigationDrawer, FontIcon } from 'react-md';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const navItems = [{
  key: 'artist',
  primaryText: 'Artist',
  leftIcon: <FontIcon>person</FontIcon>,
}];

class Navdrawer extends Component {
  constructor() {
    super();

    // Update the items so they have an onClick handler to change the current page
    this.navItems = navItems.map(item => ({
      ...item,
      onClick: () => { this.props.dispatch(push('/artist')); },
    }));

    this.state = {
      renderNode: null,
    };
  }

  hide = () => {
    this.setState({ renderNode: null });
  };

  handleShow = () => {
    this.setState({ renderNode: document.getElementById('navigation-drawer-demo') });
  };

  render() {
    const { renderNode } = this.state;
    return (
      <div>
        <NavigationDrawer
          renderNode={renderNode}
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

export default connect(null, null)(Navdrawer);
