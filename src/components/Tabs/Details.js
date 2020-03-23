import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class Details extends React.Component {
  render() {
    return (
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
              <td>These are carriers of the virus. Travels a lot, don't know about their illness. Infects healthy people.</td>
            </tr>
    
            <tr>
              <th scope="row" className="bg-warning">Infected</th>
              <td>Diagnosed with virus, isolated in the hospitals. Can't infect no more.</td>
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
    );
  }
}


export default Details;
