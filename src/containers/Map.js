import React from 'react';
import Map from './../components/Map';

import { connect } from 'react-redux';


class MapContainer extends React.Component {
  getHosts() {
    return this.props.hosts;
  }
  
  getInitialCoordinates() {
    return [
      39.854498,
      -100.628930,
    ];
  }
  
  getInitialViewState() {
    const [latitude, longitude] = this.getInitialCoordinates();
    
    return {
      longitude,
      latitude,
      zoom: 4,
      pitch: 30,
      minZoom: 1,
      maxZoom: 15,
    };
  }
  
  render() {
    return <Map
      initialViewState={this.getInitialViewState()}
      hosts={this.getHosts()}
    />;
  }
}


export default connect((state) => ({
  hosts: state.hosts
}))(MapContainer);
