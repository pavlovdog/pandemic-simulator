import React from 'react';
import Map from './../components/Map';

import { initializeHosts } from './../actions/hosts';

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
      zoom: 3,
      pitch: 30,
      minZoom: 1,
      maxZoom: 15,
    };
  }
  
  componentDidMount() {
    this.props.dispatch(initializeHosts());
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
