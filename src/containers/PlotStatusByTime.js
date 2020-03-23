import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis';

import {
  StatusManager,
} from './../config';

const statusManager = new StatusManager();


class HostsStatusLineChart extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hosts: this.props.hosts,
      data: statusManager
        .getStatuses()
        .reduce((acc, el) => Object.assign(acc, {[el]: []}), {}),
    };
    
    this.updateData = this.updateData.bind(this);
  }
  
  componentDidMount() {
    // this.intervalId = setInterval(this.updateData, 100);
    
    this.updateData();
  }
  
  updateData() {
    statusManager
      .getStatuses()
      .map(status => this.updateDataForStatus(parseInt(status)));
  }
  
  updateDataForStatus(status) {
    this.setState(prevState => {
      const statusCounter = prevState.hosts.find({ status }).length;
      
      prevState.data[status] = [
        ...prevState.data[status],
        {
          x: prevState.data[status].length,
          y: statusCounter,
        }
      ];
      
      return prevState;
    });
  }
  
  render() {
    return (
      <XYPlot width={500} height={200}>
        <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
        <VerticalGridLines style={{stroke: '#B7E9ED'}} />
        
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
                data={this.state.data[status]}
              />
            })
        }
      
      </XYPlot>
    );
  }
}


export default HostsStatusLineChart;
