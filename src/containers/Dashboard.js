import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';

import {
  exposeHosts,
  initializeHosts,
} from "../actions/hosts";


import Dashboard from './../components/Dashboard';


import { randomChoice } from "../utils/common";


class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hostsToExposeInPercents: 10,
    };
  }
  
  exposeHosts() {
    const hostIds = [...Array(this.props.hosts.length).keys()];
    
    const hostIdsToInfect = randomChoice(
      hostIds,
      parseInt(this.state.hostsToExposeInPercents * this.props.hosts.length / 100, 10),
    );

    this.props.dispatch(initializeHosts());
    this.props.dispatch(exposeHosts(hostIdsToInfect));
  }
  
  setHostsToExpose(hostsToExposeInPercents) {
    this.setState({
      hostsToExposeInPercents: parseInt(hostsToExposeInPercents),
    });
    
    this.exposeHosts();
  }
  
  componentDidMount() {
    // this.exposeHosts();
  }
  
  startSimulation() {
  
  }
  
  render() {
    return <Dashboard
      exposeHosts={() => this.exposeHosts()}
      setHostsToExpose={(value) => this.setHostsToExpose(value)}
      startSimulation={() => this.startSimulation()}
    />;
  }
}


export default connect((state) => ({
  hosts: state.hosts
}))(DashboardContainer);
