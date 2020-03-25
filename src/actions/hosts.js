import {
  hosts,
} from './action-types';


export const initializeHosts = () => ({
  type: hosts.INITIALIZE,
});


export const exposeHosts = (hostsToExposeInPercents) => ({
  type: hosts.EXPOSE,
  hostsToExposeInPercents,
});


export const exposeInfectSusceptible = (averageHostContacts, simulationStep, washHands) => ({
  type: hosts.EXPOSE_INFECT_SUSCEPTIBLE,
  averageHostContacts,
  simulationStep,
  washHands,
});


export const exposeBecomeInfect = (exposeDuration, simulationStep) => ({
  type: hosts.EXPOSE_BECOME_INFECTED,
  exposeDuration,
  simulationStep,
});


export const infectedRecoverOrDie = (infectDuration, recoverChance, simulationStep) => ({
  type: hosts.INFECTED_RECOVER_OR_DIE,
  infectDuration,
  recoverChance,
  simulationStep,
});
