// import './styles/app.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//container

class Handler extends Component {
  render() {
    return (
      <div>hello</div>
    )
  }
}

ReactDom.render(<Handler />, document.getElementById('root'));