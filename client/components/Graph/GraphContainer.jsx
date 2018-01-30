import React, { Component } from 'react';
import { render } from 'react-dom';

//import application 
import Graph from './Graph.jsx';

class GraphContainer extends Component {
  render() {
    return (
      <div id="graphContainer" className="section padding">
        <Graph />
        <Graph />
        <Graph />
      </div>
    )
  }
}

export default GraphContainer;