import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardTitle,
  Media,
  MediaOverlay,
} from 'react-md';

export default ({ artist }) => (
  <div className="md-cell">
    <Link to={`/artists/${artist.value.id}`}>
      <Card>
        <Media aspectRatio="3-2">
          <img src={artist.value.picture.lg} alt="Artist" />
          <MediaOverlay>
            <CardTitle title={artist.value.name} />
          </MediaOverlay>
        </Media>
      </Card>
    </Link>
  </div>
);
