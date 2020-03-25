import { default as Hosts } from './../data/hosts';


import {
  hosts,
} from '../actions/action-types';

import {
  randomChoice
} from "../utils/common";


const sphereKnn = require("sphere-knn");
const lookup = sphereKnn(Hosts.map(host => [host.lat, host.lng]));


function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function washHandsChance(washHandsStatus) {
  const washHandsChance = {
    'never': 0.9,
    'sometimes': 0.6,
    'regularly': 0.3,
  };
  
  return Math.random() < washHandsChance[washHandsStatus];
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
  
      const hostIds = [...Array(state.length).keys()];
  
      const hostIdsToInfect = randomChoice(
        hostIds,
        parseInt(action.hostsToExposeInPercents * state.length / 100, 10),
      );
  
      hostIdsToInfect.map(id => newState[id].status = 1);
      
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
          if (!washHandsChance(action.washHands)) return null;
          
          newState[id].status = 1;
          newState[id].step = action.simulationStep;
        });
      });

      
      return newState;
    case (hosts.EXPOSE_BECOME_INFECTED):
      newState = [...state];
      
      // Choose all exposed
      state.map((host, index) => {
        if (host.status !== 1) return null;
        
        if (action.simulationStep - host.step >= action.exposeDuration) {
          newState[index].status = 2;
          newState[index].step = action.simulationStep;
        }
      });
      
      return newState;
    case (hosts.INFECTED_RECOVER_OR_DIE):
      newState = [...state];
      
      state.map((host, index) => {
        if (host.status !== 2 || action.simulationStep - host.step < action.infectDuration) {
          return null;
        }
        
        if (Math.random() < action.recoverChance) {
          newState[index].status = 3;
        } else {
          newState[index].status = 4;
        }
      });
  
      return newState;
    default:
      return state;
  }
};


export default hostsReducer;
