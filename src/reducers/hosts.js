import { default as Hosts } from './../data/hosts';


import {
  hosts,
} from '../actions/action-types';


const sphereKnn = require("sphere-knn");
const lookup = sphereKnn(Hosts.map(host => [host.lat, host.lng]));


function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


const coordinatesIndex = {};
Hosts.map(({ lat, lng }, index) => {
  coordinatesIndex[lat] = coordinatesIndex[lat] === undefined ? {} : coordinatesIndex[lat];
  coordinatesIndex[lat][lng] = index;
});



const initializeHostsState = () => {
  return Hosts.map(host => ({ ...host, status: 0, step: 0 }));
};


const getHostsByStatus = (hosts, status) => {
  return hosts.filter((host) => host.status === status);
};


const hostsReducer = (state = [], action) => {
  let newState;
  
  switch (action.type) {
    case (hosts.INITIALIZE):
      return initializeHostsState();
    case (hosts.EXPOSE):
      newState = [...state];
      
      action.ids.map(id => newState[id].status = 1);
      
      return newState;
    case (hosts.EXPOSE_INFECT_SUSCEPTIBLE):
      newState = [...state];
      
      // Draw circle around exposed and
      getHostsByStatus(state, 1).forEach(e => {
        const contacts = getRandomArbitrary(1, action.averageHostContacts);
        const neighbours = lookup(e.lat, e.lng, contacts);
        const neighboursIds = neighbours.map(([ lat, lng ]) => coordinatesIndex[lat][lng]);
        
        neighboursIds.map(id => {
          if (newState[id].status !== 0) return null;

          newState[id].status = 1;
          newState[id].step = action.simulationStep;
        });
      });

      
      return newState;
    case (hosts.EXPOSE_BECOME_INFECTED):
      newState = [...state];
      
      // console.log(action.simulationStep, state[2]);
      
      // Choose all exposed
      state.map((host, index) => {
        if (host.status !== 1) return null;
        
        // if (host.step === 0) console.log(action, host);
  
        // console.log(host.step, action.simulationStep);
  
        if (action.simulationStep - host.step >= action.exposeDuration) {
          // console.log(action.simulationStep, host);
          newState[index].status = 2;
        }
      });
      
      return newState;
    default:
      return state;
  }
};


export default hostsReducer;
