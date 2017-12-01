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
    view: this.props.view === 'simple' ? viewItems[1] : viewItems[0],
  }

  handleSelect = (value, index) => {
    this.setState({
      view: viewItems[index],
    });
  }

  render() {

    const { albums, availableAlbums, queuedAlbums } = this.props;

    return (
      <div className="md-grid" style={{ marginTop: 40 }}>
        <h1
          className="md-cell--8-desktop md-cell--5-tablet md-cell--4-phone album-align blk"
        >
          {this.props.title}
        </h1>
        {
          this.props.showViewToggle ? (
            <div className="md-cell--4-desktop md-cell--3-tablet md-cell--4-phone album-align md-cell--middle">
              <SelectField
                id="albums-view-select"
                menuItems={viewItems}
                position={SelectField.Positions.BELOW}
                fullWidth
                centered
                onChange={this.handleSelect}
                placeholder="Album View"
              />
            </div>
          ) : (
            <div className="md-cell--4-desktop md-cell--3-tablet md-cell--4-phone album-align md-cell--middle" />
          )
        }
        {
          albums.map((album) => {

            const isAvailable = availableAlbums && availableAlbums.hasOwnProperty(album.id);

            if (this.state.view.value === 'simple') {
              return (
                <SimpleAlbum
                  album={isAvailable ? availableAlbums[album.id] : album}
                  key={album.id}
                  available={album.available}
                  path={album.path}
                  isQueued={queuedAlbums && queuedAlbums.hasOwnProperty(album.id)}
                />
              );
            }
              return (
                <Album
                  album={isAvailable ? availableAlbums[album.id] : album}
                  key={album.id}
                  available={album.available}
                  path={album.path}
                  isQueued={queuedAlbums && queuedAlbums.hasOwnProperty(album.id)}
                />
              );


          })
        }
      </div>
    );
  }
}
