import { default as Hosts } from "./../../data/hosts";
import { default as Cities } from "./../../data/cities";

export default class DataConnector {
  loadHosts(collection) {
    
    console.info(`Total hosts: ${Hosts.length}`);
    
    collection.insert(Hosts
      .map(host => Object.assign(
        host,
        { status: 0 }
      )));
  }
  
  loadCities(collection) {
    collection.insert(Cities);
  }
}

