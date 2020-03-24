import React from 'react';

import { connect } from 'react-redux';

import {
  exposeHosts,
  initializeHosts,
  exposeInfectSusceptible,
  exposeBecomeInfect,
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
      exposeDuration: 5,
      statusCounter: this.getInitialStatusCounter(),
    };
    
    this.simulationStep = 0;
  }
  
  getInitialStatusCounter() {
    return statusManager
      .getStatuses()
      .reduce((acc, el) => Object.assign(
        acc,
        {
          [el]: []
        }
        ), {});
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
  
  
  setExposeDuration(exposeDuration) {
    this.setState({
      exposeDuration: parseInt(exposeDuration),
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
    
    this.simulationStep = 0;
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
        this.props.dispatch(exposeInfectSusceptible(this.state.hostContacts, this.simulationStep));
        this.props.dispatch(exposeBecomeInfect(10, this.simulationStep));
        
        this.simulationStep++;
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
      exposeDuration={this.state.exposeDuration}
      setExposeDuration={(value) => this.setExposeDuration(value)}
      startSimulation={() => this.startSimulation()}
      resetSimulation={() => this.resetSimulation()}
      statusCounter={this.state.statusCounter}
    />;
  }
}


export default connect((state) => ({
  hosts: state.hosts
}))(DashboardContainer);
