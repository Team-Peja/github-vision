import React, { Component } from 'react';
import { render } from 'react-dom';


//App components
import Nav from './Nav/Nav.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}};
  }

  //do fetch for authorization here
  componentWillMount() {

  }

  render() {
    return (
    <div id="container">
      <Nav />
      <Main user={this.state.user}/>
      <Footer />
    </div>
    )
  }
}

export default Container;