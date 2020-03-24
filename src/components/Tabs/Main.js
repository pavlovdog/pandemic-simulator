import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PlotStatusByTime from "./PlotStatusByTime";

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
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.props.startSimulation()}
            >Start pandemic</button>
          </Col>
  
          <Col>
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.props.resetSimulation()}
            >Reset</button>
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
