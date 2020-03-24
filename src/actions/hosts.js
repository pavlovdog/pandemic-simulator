import {
  hosts,
} from './action-types';


export const initializeHosts = () => ({
  type: hosts.INITIALIZE,
});


export const exposeHosts = (ids) => ({
  type: hosts.EXPOSE,
  ids,
});


export const exposeInfectSusceptible = (averageHostContacts, simulationStep) => ({
  type: hosts.EXPOSE_INFECT_SUSCEPTIBLE,
  averageHostContacts,
  simulationStep,
});


export const exposeBecomeInfect = (exposeDuration, simulationStep) => ({
  type: hosts.EXPOSE_BECOME_INFECTED,
  exposeDuration,
  simulationStep,
});
