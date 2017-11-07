import React from 'react';
import { Button } from 'react-md';

export default props => (
  <Button
    raised
    secondary
    disabled={props.disabled}
    style={{ width: '100%' }}
    className="md-text-center"
    onClick={props.onClick}
  >
    {props.text}
  </Button>
);
