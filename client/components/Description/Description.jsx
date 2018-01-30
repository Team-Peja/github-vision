import React, { Component } from 'react';
import { render } from 'react-dom';

//import instructions
import Instruction from './Instruction.jsx';

const instructions = [
  {
    title: 'Log in using Github!',
  },
  {
    title: 'Please authorize us!',
  },
  {
    title: 'Play around with the data',
  },
  {
    title: 'Export and show off to friends :)',
  },
]

class Description extends Component {
  render() {
    return(
      <div id="description">
        {instructions.map((element, i) => {
          return (
            <Instruction 
              key={`instruction-${i}`}
              title={element.title}
            /> 
          );
        })}
      </div>
    )
  }
}

export default Description;