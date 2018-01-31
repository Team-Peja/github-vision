import React, { Component } from 'react';
import { render } from 'react-dom';

class Instruction extends Component {
  render() {
    return(
      <div className="instruction">
        <p>{this.props.title}</p>
      </div>
    )
  }
}

export default Instruction;