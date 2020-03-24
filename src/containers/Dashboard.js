import React from 'react';

import { connect } from 'react-redux';

import {
  exposeHosts,
  initializeHosts,
  exposeInfectSusceptible,
} from "../actions/hosts";


import Dashboard from './../components/Dashboard';
import { StatusManager } from "../config";

import { randomChoice } from "../utils/common";


const statusManager = new StatusManager();


class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hostsToExposeInPercents: 2,
      hostContacts: 5,
      statusCounter: this.getInitialStatusCounter(),
    };
  }
  
  getInitialStatusCounter() {
    return statusManager
      .getStatuses()
      .reduce((acc, el) => Object.assign(acc, {[el]: []}), {});
  }
  
  initializeStatusCounter() {
    this.setState({
      statusCounter: this.getInitialStatusCounter(),
    });
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
  
  setHostContacts(hostContacts) {
    this.setState({
      hostContacts: parseFloat(hostContacts),
    })
  }
  
  endSimulation() {
    if (this.simulationInterval !== undefined) {
      clearInterval(this.simulationInterval);
    }
  }
  
  resetSimulation() {
    this.endSimulation();
    this.props.dispatch(initializeHosts());
    this.exposeHosts();
    this.initializeStatusCounter();
  }
  
  updateStatusCounterForStatus(status) {
    this.setState(prevState => {
      const statusCounter = this.props.hosts.filter(host => host.status === status).length;
    
      prevState.statusCounter[status] = [
        ...prevState.statusCounter[status],
        {
          x: prevState.statusCounter[status].length,
          y: statusCounter,
        }
      ];
    
      return prevState;
    });
  }
  
  updateStatusCounter() {
    statusManager
      .getStatuses()
      .map(status => this.updateStatusCounterForStatus(status));
  }

  startStatusCounter() {
    this.initializeStatusCounter();

    setInterval(
      () => this.updateStatusCounter(),
      500,
    );
  }
  
  componentDidMount() {
    this.startStatusCounter();
    this.exposeHosts();
  }
  
  startSimulation() {
    this.endSimulation();
    this.simulationInterval = setInterval(
      () => {
        this.props.dispatch(exposeInfectSusceptible(this.state.hostContacts));
      },
      1000,
    );
  }
  
  render() {
    return <Dashboard
      exposeHosts={() => this.exposeHosts()}
      hostsToExposeInPercents={this.state.hostsToExposeInPercents}
      setHostsToExpose={(value) => this.setHostsToExpose(value)}
      hostContacts={this.state.hostContacts}
      setHostContacts={(value) => this.setHostContacts(value)}
      startSimulation={() => this.startSimulation()}
      resetSimulation={() => this.resetSimulation()}
      statusCounter={this.state.statusCounter}
    />;
  }
}


export default connect((state) => ({
  hosts: state.hosts
}))(DashboardContainer);
