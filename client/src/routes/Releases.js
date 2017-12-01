import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { SelectField } from 'react-md';
import fetchNewAlbums from '../actions/fetchNewAlbums';
import Albums from '../components/Albums';
import Spinner from '../components/Spinner';

const viewItems = [{
  label: 'New Releases',
  value: 'newAlbums',
}, {
  label: 'Staff Picks',
  value: 'staffPicks',
}, {
  label: 'Top 20',
  value: 'topAlbums',
}];

class Releases extends Component {

  state = {
    view: viewItems[0],
  }

  componentDidMount() {
    this.props.fetchNewAlbums();
  }

  handleSelect = (value, index) => {
    this.setState({
      view: viewItems[index],
    });
  }

  render() {

    const { albums, availableAlbums } = this.props;

    if (!albums.data.newAlbums.length > 0 || !isLoaded(availableAlbums)) {
      return (
        <Spinner />
      );
    }

    return (
      <div style={{ marginTop: 40 }}>
        <div className="md-grid">
          <h1 className="md-cell--8-desktop md-cell--5-tablet md-cell--4-phone album-align blk">
            {`${this.state.view.label}`}
          </h1>
          <div className="md-cell--4-desktop md-cell--3-tablet md-cell--4-phone album-align md-cell--middle">
            <SelectField
              id="releases-view-select"
              menuItems={viewItems}
              position={SelectField.Positions.BELOW}
              fullWidth
              centered
              defaultValue="newAlbums"
              onChange={this.handleSelect}
            />
          </div>
        </div>

        <Albums
          albums={albums.data[this.state.view.value]}
          availableAlbums={availableAlbums}
          view="simple"
        />
      </div>
    );
  }
}

const fbReleases = firebaseConnect([
  {
    path: '/albums',
    storeAs: 'availableAlbums',
  },
])(Releases);

const mapStateToProps = state => ({
  albums: state.newAlbums,
  availableAlbums: state.firebase.data.availableAlbums,
});

const mapDispatchToProps = {
  fetchNewAlbums,
};

export default connect(mapStateToProps, mapDispatchToProps)(fbReleases);

