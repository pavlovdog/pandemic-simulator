import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  withRouter,
} from "react-router-dom";


import Main from './Tabs/Main';
import Settings from './Tabs/Settings';
import Details from './Tabs/Details';


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
            <h1>Pandemic simulator</h1>
          </Col>
        </Row>

        <Row>
          <Col style={{'paddingBottom': '20px'}}>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/app/main">Main</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/app/settings">Settings</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/app/details">Details</NavLink>
              </li>
            </ul>
          </Col>
        </Row>
  
        <Switch>
          <Route path="/app/main">
            <Main {...this.props}/>
          </Route>
          <Route path="/app/settings">
            <Settings {...this.props}/>
          </Route>
          <Route path="/app/details">
            <Details {...this.props}/>
          </Route>
        </Switch>
      </Container>
    );
  }
}


export default withRouter(Dashboard);
