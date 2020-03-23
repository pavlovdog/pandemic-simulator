import React from 'react';
import {
  withRouter
} from "react-router-dom";

import Landing from '../components/Landing';

const viruses = [
  'COVID, 2019, worldwide',
  'Measles, 2019, Congo',
  'Ebola, 2018, Congo & Uganda',
  'H1N1, 2015, India',
  'Cholera, 2008, Zimbabwe',
  'Yellow fever, 2016, Angola',
  'H1N1, 2009, worldwide',
];


class LandingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      virusId: 0,
    };
    
    setInterval(() => {
      this.setState({
        virusId: (this.state.virusId + 1) % viruses.length,
      });
    }, 2000);
  }
  
  render() {
    return (<Landing virus={viruses[this.state.virusId]}/>);
  }
}


export default withRouter(LandingContainer);
