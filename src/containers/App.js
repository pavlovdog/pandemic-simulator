import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Map from './Map';
import Dashboard from './Dashboard';


const mapStyle = {
  'height': '100%',
  'minHeight': '100vh',
};


const dashboardStyle = {
  'position': 'fixed',
  height: '100%',
};


class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col style={ mapStyle } xs={8}>
            <Map/>
          </Col>
          <Col>
            <Dashboard style={dashboardStyle}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
