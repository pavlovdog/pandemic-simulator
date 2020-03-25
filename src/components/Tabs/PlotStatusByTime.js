import React from 'react';
import {
  XAxis,
  YAxis,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
  FlexibleWidthXYPlot,
} from 'react-vis';

import 'react-vis/dist/style.css';

import './../../../node_modules/react-vis/dist/style.css';

import { StatusManager } from "../../config";

const statusManager = new StatusManager();


class PlotStatusByTime extends React.Component {
  render() {
    return (
      <FlexibleWidthXYPlot height={400} style={{marginTop: '50px', marginBottom: '50px' }}>
        <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
        <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
      
        <XAxis
          title="Time"
          style={{
            line: {
              stroke: '#6b6b76'
            },
            ticks: {
              stroke: '#6b6b76',
            },
            text: {
              stroke: 'none',
              fill: '#6b6b76',
              fontWeight: 600,
            }
          }}
        />
        <YAxis title="People" tickPadding={1}/>
      
      
        {
          statusManager.getStatuses()
            .map(status => {
              return <LineSeries
                key={status}
                stroke={statusManager.getHEXColor(status)}
                className={`${status}-series`}
                data={this.props.statusCounter[status]}
              />
            })
        }
    
      </FlexibleWidthXYPlot>
    );
  }
}


export default PlotStatusByTime;

