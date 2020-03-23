import { default as Hosts } from './../data/hosts';


import {
  hosts,
} from '../actions/action-types';


const initializeHostsState = () => {
  return Hosts.map(host => ({ ...host, status: 0 }));
};


const hostsReducer = (state = [], action) => {
  switch (action.type) {
    case (hosts.INITIALIZE):
      return initializeHostsState();
    case (hosts.EXPOSE):
      const newState = [...state];
      
      action.ids.map(id => newState[id].status = 1);
      
      return newState;
    case (hosts.EXPOSE_INFECT_SUSCEPTIBLE):
      return state;
    default:
      return state;
  }
};


export default hostsReducer;
