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
                <h1 className="display-2">Emulate virus pandemic</h1>
                <div className="lead mb-3 text-mono text-success">
                  { props.virus }
                </div>
                
                <p className="mt-5 text-grey text-spacey">
                  Neon Glow is a free and open source Bootstrap theme.
                  It was built on top of the Bootstrap 4.
                  Only the leetest of hackers will be able to wield its power.
                  Scroll down to explore the components and dive into the source.
                </p>
                
                <div className="text-mono">
                  <a href="/app"
                     className="btn btn-primary btn-shadow px-3 my-2 ml-0 text-left"
                  >Run emulation</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Landing;
