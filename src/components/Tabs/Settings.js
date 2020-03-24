import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Settings extends React.Component {
  render() {
    return (
      <div>
        
        <Row>
          <Col>
            <div className="form-group">
              <label>How often people wash the hands  </label>
  
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" htmlFor="customCheck1">Never</label>
              </div>
  
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck2"/>
                <label className="custom-control-label" htmlFor="customCheck2">Sometimes</label>
              </div>
  
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck3"/>
                <label className="custom-control-label" htmlFor="customCheck3">Regularly</label>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <div className="form-group">
              <label htmlFor="hostsToExposeInPercents">
                How many people exposed at the beggining (<strong>{this.props.hostsToExposeInPercents}%</strong>)
              </label>
    
              <input
                type="range"
                className="form-control custom-range"
                min="0.5"
                max="100"
                step="0.5"
                value={this.props.hostsToExposeInPercents}
                onChange={(e) => {
                  this.props.setHostsToExpose(e.target.value);
                  this.props.exposeHosts();
                }}
                id="hostsToExposeInPercents"
              />
  
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label htmlFor="hostContacts">
                Maximum amount of contacts for person (<strong>{this.props.hostContacts} contacts</strong>)
              </label>
    
              <input
                type="range"
                className="form-control custom-range"
                min="1"
                max="10"
                step="1"
                value={this.props.hostContacts}
                onChange={(e) => {
                  this.props.setHostContacts(e.target.value);
                }}
                id="hostContacts"
              />
  
            </div>
          </Col>
        </Row>
  
        <Row>
          <Col>
            <div className="form-group">
              <label htmlFor="hostsToExposeInPercents">
                Duration of incubate period (<strong>{this.props.exposeDuration} days</strong>)
              </label>
        
              <input
                type="range"
                className="form-control custom-range"
                min="1"
                max="10"
                step="1"
                value={this.props.exposeDuration}
                onChange={(e) => {
                  this.props.setExposeDuration(e.target.value);
                }}
                id="hostsToExposeInPercents"
              />
      
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Settings;
