import React from "react";
import Treemap from "react-vis";

class TreeMapStatus extends React.Component {
  render() {
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300
      },
      data: this.state.treemapData,
      onLeafMouseOver: x => this.setState({ hoveredNode: x }),
      onLeafMouseOut: () => this.setState({ hoveredNode: false }),
      onLeafClick: () => this.setState({ treemapData: _getRandomData() }),
      height: 300,
      mode: this.state.useCirclePacking ? 'circlePack' : 'squarify',
      getLabel: x => x.name,
      width: 350
    };
  
    return (
      <div className="dynamic-treemap-example">
        <Treemap {...treeProps} />
      </div>
    );
  }
}


export default TreeMapStatus;
