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
    window.addEventListener('scroll', this.showButton);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showButton);
  }

  showButton = () => {
    if (window.scrollY > 1050) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
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
          {
            (matches) => {

              let positionLeft;

              if (matches) {
                positionLeft = 16;
              } else {
                positionLeft = 11;
              }

              return (
                <Button
                  secondary
                  floating
                  mini
                  iconEl={<FontIcon>arrow_upward</FontIcon>}
                  style={{
                    position: 'fixed',
                    left: positionLeft,
                    bottom: 20,
                    zIndex: 999,
                  }}
                  onClick={scroll.scrollToTop}
                >
                Back
                </Button>
              );
            }
          }
        </MediaQuery>
      </div>
    );

  }
}
