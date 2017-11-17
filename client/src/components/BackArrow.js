import React from 'react';
import { Button, FontIcon } from 'react-md';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

const BackArrow = props => (
  <Button
    secondary
    floating
    mini
    iconEl={<FontIcon>arrow_back</FontIcon>}
    onClick={props.goBack}
    style={{ marginTop: 10 }}
  >
    Back
  </Button>
);

const mapDispatchToProps = {
  goBack,
};

export default connect(null, mapDispatchToProps)(BackArrow);
