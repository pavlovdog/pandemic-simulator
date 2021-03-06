import React from 'react';

import {
  connect,
  batch,
} from 'react-redux';

import {
  exposeHosts,
  initializeHosts,
  exposeInfectSusceptible,
  exposeBecomeInfect,
  infectedRecoverOrDie,
} from "../actions/hosts";


import Dashboard from './../components/Dashboard';
import { StatusManager } from "./../utils/status-manager";


const statusManager = new StatusManager();


class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hostsToExposeInPercents: 0.5,
      hostContacts: 8,
      exposeDuration: 14,
      transmissionProbability: 4,
      statusCounter: this.getInitialStatusCounter(),
      infectDuration: 14,
      recoverChance: 98.5,
      washHands: 'sometimes',
    };
    
    this.simulationStep = 0;
    this.iterationFrequency = 100;
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
    this.props.dispatch(initializeHosts());
    this.props.dispatch(exposeHosts(this.state.hostsToExposeInPercents));
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
  
  setTransmissionProbability(transmissionProbability) {
    this.setState({
      transmissionProbability: parseFloat(transmissionProbability),
    })
  }
  
  setInfectDuration(infectDuration) {
    this.setState({
      infectDuration: parseInt(infectDuration),
    })
  }
  
  setRecoverChance(recoverChance) {
    this.setState({
      recoverChance: parseFloat(recoverChance),
    })
  }
  
  setWashHands(washHands) {
    this.setState({
      washHands,
    });
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
      this.iterationFrequency,
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
        batch(() => {
          this.props.dispatch(exposeInfectSusceptible(this.state.hostContacts, this.simulationStep, this.state.washHands, this.state.transmissionProbability));
          this.props.dispatch(exposeBecomeInfect(10, this.simulationStep));
          this.props.dispatch(infectedRecoverOrDie(5, this.state.recoverChance / 100, this.simulationStep));
        });
        
        this.simulationStep++;
      },
      this.iterationFrequency,
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
      infectDuration={this.state.infectDuration}
      setInfectDuration={(value) => this.setInfectDuration(value)}
      recoverChance={this.state.recoverChance}
      setRecoverChance={(value) => this.setRecoverChance(value)}
      washHands={this.state.washHands}
      setWashHands={(value) => this.setWashHands(value)}
      transmissionProbability={this.state.transmissionProbability}
      setTransmissionProbability={(value) => this.setTransmissionProbability(value)}
      startSimulation={() => this.startSimulation()}
      resetSimulation={() => this.resetSimulation()}
      statusCounter={this.state.statusCounter}
    />;
  }
}


export default connect((state) => ({
  hosts: state.hosts
}))(DashboardContainer);
