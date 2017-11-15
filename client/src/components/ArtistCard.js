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
    <Link to={`/artist/${artist.id}`}>
      <Card>
        <Media aspectRatio="3-2">
          <img src={artist.picture.lg} alt="Artist" />
          <MediaOverlay>
            <CardTitle title={artist.name} />
          </MediaOverlay>
        </Media>
      </Card>
    </Link>
  </div>
);
