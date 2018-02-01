import React, { Component } from 'react';
import { render } from 'react-dom';

//application imports
import Description from '../Description/Description.jsx';
import GraphContainer from '../Graph/GraphContainer.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  displayBody() {
    console.log(this.props.user);
    if (this.props.user) {
      return <Description />
    } else {
      return <GraphContainer />
    }
  }
  
  render() {
    return (
    <div id="main" className="section padding">
      <div id="instructions">
        {this.displayBody()}
      </div>
    </div>
    )
  }
}

export default Main;