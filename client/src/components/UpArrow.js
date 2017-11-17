import React, { Component } from 'react';
import { Button, FontIcon } from 'react-md';
import Scroll from 'react-scroll';
import MediaQuery from 'react-responsive';

const scroll = Scroll.animateScroll;

export default class UpArrow extends Component {

  state = {
    show: false,
  }

  componentWillMount() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1050) {
        this.setState({ show: true });
      } else {
        this.setState({ show: false });
      }
    });
  }

  render() {

    if (!this.state.show) {
      return null;
    }

    // use media queries to determine placement of the Button
    // this is only for aesthetics and is probably a bad idea!
    return (
      <div>
        <MediaQuery minWidth={768}>
          <Button
            secondary
            floating
            mini
            iconEl={<FontIcon>arrow_upward</FontIcon>}
            style={{
          position: 'fixed',
          left: 16,
          bottom: 20,
          zIndex: 999,
        }}
            onClick={scroll.scrollToTop}
          >
        Back
          </Button>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <Button
            secondary
            floating
            mini
            iconEl={<FontIcon>arrow_upward</FontIcon>}
            style={{
          position: 'fixed',
          left: 12,
          bottom: 20,
          zIndex: 999,
        }}
            onClick={scroll.scrollToTop}
          >
        Back
          </Button>
        </MediaQuery>
      </div>
    );

  }
}
