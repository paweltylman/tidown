import React, { Component } from 'react';
import { SelectField } from 'react-md';
import NewReleases from '../containers/NewReleases';

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

export default class Releases extends Component {

  state = {
    view: viewItems[0],
  }

  handleSelect = (value, index) => {
    this.setState({
      view: viewItems[index],
    });
  }

  render() {
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
        <div className="md-grid">
          <NewReleases
            view={this.state.view}
          />
        </div>
      </div>
    );
  }
}
