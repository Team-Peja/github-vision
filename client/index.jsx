// import './styles/app.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/app.less';

//container
import Container from './components/Container.jsx';

class Handler extends Component {
  render() {
    return (
      <Container />
    )
  }
}

ReactDOM.render(<Handler />, document.getElementById('root'));