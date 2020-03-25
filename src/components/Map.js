import React from 'react';
import DeckGL from '@deck.gl/react';

import {
  StaticMap
} from 'react-map-gl';

import {
  ScatterplotLayer,
} from '@deck.gl/layers';

import { StatusManager } from './../config';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicGF2bG92ZG9nIiwiYSI6ImNrN2N6eXJiZjA1Njcza3FrM2htN2t0MzUifQ.RemVD_DxbR4XpAvxDjy_hQ';
const statusManager = new StatusManager();



class Map extends React.Component {
  render() {
    return (
      <DeckGL
        initialViewState={this.props.initialViewState}
        layers={[
          new ScatterplotLayer({
            id: 'cities',
            data: this.props.hosts,
            filled: true,
            visible: true,
            getPosition: d => [d.lng, d.lat],
            getFillColor: d => statusManager.getRGBColor(d.status), // make the dots visible or darker background
            getRadius: d => 10,
            radiusScale: 1,  // make the dots visible or darker background
            radiusMinPixels: 1, // make the dots visible or darker background
            radiusMaxPixels: 1000,
          }),
        ]}
        controller={true}
      >
        <StaticMap
          mapStyle='mapbox://styles/mapbox/dark-v9'
          mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }
        />
      </DeckGL>
    );
  }
}


export default Map;
