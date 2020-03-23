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


export const exposeInfectSusceptible = () => ({
  type: hosts.EXPOSE_INFECT_SUSCEPTIBLE,
});
