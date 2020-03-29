import {
  statusDescriptions,
  statusRBGColors,
} from './../../config';

const colorConvert = require('color-convert');


export class StatusManager {
  getStatuses() {
    return Object.keys(statusDescriptions).map(s => parseInt(s));
  }
  
  getHEXColor(status) {
    return colorConvert.rgb.hex(this.getRGBColor(status));
  }
  
  getDescription(status) {
    return statusDescriptions[parseInt(status)];
  }
  
  getRGBColor(status) {
    return statusRBGColors[parseInt(status)];
  }
}
