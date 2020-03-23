import React from 'react';

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
      hostsToExposeInPercents: 2,
      hostIgnoreQuarantineInPercents: 5,
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
      hostsToExposeInPercents: parseFloat(hostsToExposeInPercents),
    });
    
    this.exposeHosts();
  }
  
  setHostsIgnoreQuarantine(hostIgnoreQuarantineInPercents) {
    this.setState({
      hostIgnoreQuarantineInPercents: parseFloat(hostIgnoreQuarantineInPercents),
    })
  }
  
  startSimulation() {
    console.log('starting simulation');
  }
  
  render() {
    return <Dashboard
      exposeHosts={() => this.exposeHosts()}
      hostsToExposeInPercents={this.state.hostsToExposeInPercents}
      setHostsToExpose={(value) => this.setHostsToExpose(value)}
      hostIgnoreQuarantineInPercents={this.state.hostIgnoreQuarantineInPercents}
      setHostsIgnoreQuarantine={(value) => this.setHostsIgnoreQuarantine(value)}
      startSimulation={() => this.startSimulation()}
      plotStatusByTimeData={{ 0: [{ x: 1, y:2 }] }}
    />;
  }
}


export default connect((state) => ({
  hosts: state.hosts
}))(DashboardContainer);
