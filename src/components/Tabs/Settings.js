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
                <input
                  checked={this.props.washHands === 'never'}
                  onChange={(e) => this.props.setWashHands(e.target.value)}
                  value={'never'}
                  type="radio"
                  name="washHands"
                  className="custom-control-input"
                  id="washHandsNever"/>

                <label
                  className="custom-control-label"
                  htmlFor="washHandsNever">Never</label>
              </div>
  
              <div className="custom-control custom-checkbox">
                <input
                  checked={this.props.washHands === 'sometimes'}
                  onChange={(e) => this.props.setWashHands(e.target.value)}
                  value={'sometimes'}
                  type="radio"
                  name="washHands"
                  className="custom-control-input"
                  id="washHandsSometimes"/>

                <label
                  className="custom-control-label"
                  htmlFor="washHandsSometimes">Sometimes</label>
              </div>
  
              <div className="custom-control custom-checkbox">
                <input
                  checked={this.props.washHands === 'regularly'}
                  onChange={(e) => this.props.setWashHands(e.target.value)}
                  value={'regularly'}
                  type="radio"
                  name="washHands"
                  className="custom-control-input"
                  id="washHandsRegularly"/>

                <label
                  className="custom-control-label"
                  htmlFor="washHandsRegularly">Regularly</label>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <div className="form-group">
              <label htmlFor="hostsToExposeInPercents">
                How many people infected at the beginning (<strong>{this.props.hostsToExposeInPercents}%</strong>)
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
  
              <small className="form-text text-muted">
                These people have no idea they are infected and will infect healthy people.
              </small>
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
                max="30"
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
                max="100"
                step="1"
                value={this.props.exposeDuration}
                onChange={(e) => {
                  this.props.setExposeDuration(e.target.value);
                }}
                id="hostsToExposeInPercents"
              />
  
              <small className="form-text text-muted">
                How long a patient has no symptoms. During this period, the person can infect healthy people.
              </small>
            </div>
          </Col>
        </Row>
  
        <Row>
          <Col>
            <div className="form-group">
              <label htmlFor="infectDuration">
                Disease duration (<strong>{this.props.infectDuration} days</strong>)
              </label>
        
              <input
                type="range"
                className="form-control custom-range"
                min="1"
                max="100"
                step="1"
                value={this.props.infectDuration}
                onChange={(e) => {
                  this.props.setInfectDuration(e.target.value);
                }}
                id="infectDuration"
              />
  
              <small className="form-text text-muted">
                After this period, the patient will recover or die.
              </small>
            </div>
          </Col>
        </Row>
  
        <Row>
          <Col>
            <div className="form-group">
              <label htmlFor="infectDuration">
                Chance of recovery (<strong>{this.props.recoverChance}%</strong>)
              </label>
        
              <input
                type="range"
                className="form-control custom-range"
                min="1"
                max="100"
                step="0.1"
                value={this.props.recoverChance}
                onChange={(e) => {
                  this.props.setRecoverChance(e.target.value);
                }}
                id="infectDuration"
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Settings;
