import React from 'react';
import { Button } from 'react-md';

export default props => (
  <Button
    raised
    secondary
    disabled={props.disabled}
    onClick={props.handleClick}
    style={{
      width: '100%',
    }}
  >
    {props.text}
  </Button>
);
