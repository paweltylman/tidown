import React from 'react';
import { Button, FontIcon } from 'react-md';
import Scroll from 'react-scroll';
import MediaQuery from 'react-responsive';

const scroll = Scroll.animateScroll;

const UpArrow = () => (
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

export default UpArrow;
