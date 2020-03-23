import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis';

import 'react-vis/dist/style.css';

import { StatusManager } from "../../config";

const statusManager = new StatusManager();


class PlotStatusByTime extends React.Component {
  render() {
    console.log(this.props.data);
    
    return (
      <XYPlot width={500} height={200}>
        <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
        <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
        
        <XAxis
          title="X Axis"
          style={{
            line: {
              stroke: '#ADDDE1'
            },
            ticks: {
              stroke: '#ADDDE1',
            },
            text: {
              stroke: 'none',
              fill: '#6b6b76',
              fontWeight: 600,
            }
          }}
        />
        <YAxis title="Y Axis" />
        
        
        {
          statusManager.getStatuses()
            .map(status => {
              return <LineSeries
                key={status}
                stroke={statusManager.getHEXColor(status)}
                className={`${status}-series`}
                data={[]}
              />
            })
        }
      
      </XYPlot>
    );
  }
}


export default PlotStatusByTime;

