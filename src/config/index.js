const colorConvert = require('color-convert');


const statusRBGColors = {
  0: [23, 176, 107],
  1: [255, 60, 92],
  2: [249, 117, 21],
  3: [219, 235, 251],
  4: [50, 51, 74],
};


const statusDescriptions = {
  0: 'susceptible',
  1: 'exposed',
  2: 'infected',
  3: 'recovered',
  4: 'dead',
};


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
