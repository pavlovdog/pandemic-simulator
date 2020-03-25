import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PlotStatusByTime from "./PlotStatusByTime";
// import TreeMapStatus from "./TreeMapStatus";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <ul>
              <li>People wash hands <strong>sometimes</strong></li>
              <li>At the beginning <strong>{this.props.hostsToExposeInPercents}%</strong> of population is infected</li>
              <li>Each person is in contact with a maximum of <strong>{this.props.hostContacts} people</strong> per day</li>
              <li>Incubation period lasts <strong>{this.props.exposeDuration} days</strong></li>
              <li>Disease duration is <strong>{this.props.infectDuration} days</strong></li>
              <li>Chance of recovery is <strong>{this.props.recoverChance}%</strong></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.props.startSimulation()}
            ><span role='img'>▶</span>️ Run pandemic</button>
          </Col>
  
          <Col>
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.props.resetSimulation()}
            ><span role='img'>🔄</span> Reset</button>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <PlotStatusByTime {...this.props}/>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Main;
