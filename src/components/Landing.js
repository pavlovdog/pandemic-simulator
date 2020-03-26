import React from 'react';

import '../utils/neon-glow/css/bootstrap4-neon-glow.min.css';


function Landing(props) {
  return (
    <div id="ht-tm-jumbotron">
      <div className="jumbotron bg-transparent mb-0 radius-0">
        <div className="container">
          <div className="ht-tm-header">
            <div className="row">
              <div className="col-xl-6">
                <h1 className="display-2">Pandemic simulator</h1>
                <div className="lead mb-3 text-mono text-success">
                  { props.virus }
                </div>

                <p className="mt-5 text-grey text-spacey">
                  Simulate virus pandemic without eating a bat. This app can demonstrate you the answers questions about pandemics:
                </p>
                
                <ul>
                  <li>Where it is safest during an epidemic?</li>
                  <li>Does handwashing help keep the virus from spreading?</li>
                  <li>Why quarantine is so important?</li>
                </ul>
                
                <p className="mt-5 text-grey text-spacey">
                  This tool does not claim to be of scientific value, but it demonstrates well how the virus can spread in different ways depending on our behavior. Also, currently only USA map is supported. Tweet me to add your country.
                </p>
                
                <p className="mt-5 text-grey text-spacey">
                  #stayhome
                </p>
                
                <div className="text-mono">
                  <a href="/app/main"
                     className="btn btn-primary btn-shadow px-3 my-2 ml-0 text-left"
                  >Run emulation</a>
                </div>
              </div>
              <div className="col-xl-6" style={{paddingTop: '10vh'}}>
                <img src="/demo.gif" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Landing;
