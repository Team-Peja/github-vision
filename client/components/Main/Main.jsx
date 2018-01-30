import React, { Component } from 'react';
import { render } from 'react-dom';

class Main extends Component {
  render() {
    return (
    <div id="main" className="section padding">
      <div id="instructions">
        <div className="h2 fw-600 margin-top margin-bottom-m raleway">Get Started</div>
        {/* {this.renderInstructions()} */}
      </div>
    </div>
    )
  }
}

export default Main;