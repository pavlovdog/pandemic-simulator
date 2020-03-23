import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class Main extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <ul>
              <li>Pandemic starts in <strong>New York</strong></li>
              <li>People wash hands <strong>sometimes</strong></li>
              <li>At the beginning <strong>50%</strong> of population is infected</li>
              <li><strong>10%</strong> of population ignore quarantine</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.props.startSimulation()}
            >Start pandemia</button>
          </Col>
  
          <Col>
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.props.resetSimulation()}
            >Reset</button>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Main;
