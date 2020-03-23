import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const separator = {
  textAlign: 'center',
  paddingBottom: '20px',
  paddingTop: '20px',
};


class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Row style={separator}>
          <Col>
            <h2>Pandemic simulator</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="bg-success">Susceptible</th>
                  <td>Healthy, never been infected before.</td>
                </tr>
  
                <tr>
                  <th scope="row" className="bg-danger">Exposed</th>
                  <td>These are carriers of the virus. Infects healthy people.</td>
                </tr>
      
                <tr>
                  <th scope="row" className="bg-warning">Infected</th>
                  <td>Diagnosed with virus, staying in the hospitals. Can't infect no more.</td>
                </tr>

                <tr>
                  <th scope="row" className="bg-light" style={{color: 'black'}}>Recovered</th>
                  <td>Has acquired immunity from the virus. Can't infect no more.</td>
                </tr>

                <tr>
                  <th scope="row" className="bg-dark">Dead</th>
                  <td>💀 💀 💀</td>
                </tr>
              </tbody>
            </table>
            
          </Col>
        </Row>
  
        <Row style={separator}>
          <Col>
            <h3>Settings</h3>
          </Col>
        </Row>
  
        <Row>
          <Col>
            <div className="input-group">
              <div className="input-group-prepend">
                <button
                  className="btn btn-danger"
                  onClick={() => this.props.exposeHosts()}
                  type="button">
                  Expose people
                </button>
              </div>
              <input
                type="number"
                className="form-control"
                placeholder="Specify percentage to expose, 10 by default"
                aria-label=""
                aria-describedby="basic-addon1"/>
            </div>
          </Col>
          <Col>
            <button
              className="btn btn-dark btn-block"
              onClick={() => this.props.startSimulation()}
            >Run</button>
          </Col>
        </Row>
  
        <Row style={separator}>
          <Col>
            <h3>Start simulation</h3>

          </Col>
        </Row>
      </Container>
    );
  }
}


export default Dashboard;
