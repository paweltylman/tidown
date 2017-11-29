import React, { Component } from 'react';
import { SelectField } from 'react-md';
import Album from '../components/Album';
import SimpleAlbum from '../components/SimpleAlbum';

const viewItems = [{
  label: 'Expanded View',
  value: 'expanded',
}, {
  label: 'Simple View',
  value: 'simple',
}];

export default class Albums extends Component {

  state = {
    view: viewItems[0],
  }

  handleSelect = (value, index) => {
    this.setState({
      view: viewItems[index],
    });
  }

  render() {

    const { albums, available } = this.props;

    return (
      <div className="md-grid" style={{ marginTop: 40 }}>
        <h1
          className="md-cell--8-desktop md-cell--5-tablet md-cell--4-phone album-align blk"
        >
          {this.props.title}
        </h1>
        <div className="md-cell--4-desktop md-cell--3-tablet md-cell--4-phone album-align md-cell--middle">
          <SelectField
            id="albums-view-select"
            menuItems={viewItems}
            position={SelectField.Positions.BELOW}
            fullWidth
            centered
            onChange={this.handleSelect}
            placeholder="Expanded View"
          />
        </div>
        {
          albums.map((album) => {
            const isAvailable = available && available.hasOwnProperty(album.id);

            if (this.state.view.value === 'simple') {
              return (
                <SimpleAlbum
                  album={album}
                  key={album.id}
                  path={isAvailable ? available[album.id].path : null}
                />
              );
            }
              return (
                <Album
                  album={album}
                  key={album.id}
                  path={isAvailable ? available[album.id].path : null}
                />
              );


          })
        }
      </div>
    );
  }
}
