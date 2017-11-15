import { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import clearAlbums from '../actions/clearAlbums';

class ScrollToTop extends Component {

  componentDidUpdate(prevProps) {

    this.props.clearAlbums();

    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = {
  clearAlbums,
};

const connectedScrollToTop = connect(null, mapDispatchToProps)(ScrollToTop);

export default withRouter(connectedScrollToTop);
