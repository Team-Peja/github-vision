import React, { Component } from 'react';
import { render } from 'react-dom';

//application imports
import Description from '../Description/Description.jsx';
import Graph from '../Graph/Graph.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  displayBody() {
    console.log(this.props.user);
    let bool = false;
    if (bool) {
      return <Description />
    } else {
      return <Graph />
    }
  }
  
  render() {
    return (
    <div id="main" className="section padding">
      <div id="instructions">
        <div className="h2 fw-600 margin-top margin-bottom-m raleway">Get Started</div>
        {this.displayBody()}
      </div>
    </div>
    )
  }
}

export default Main;