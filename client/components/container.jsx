import React, { Component } from 'react';
import { render } from 'react-dom';


//App components
import Nav from './Nav/Nav.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

class Container extends Component {
  render() {
    return (
    <div id="container">
      <Nav />
      <Main />
      <Footer />
    </div>
    )
  }
}

export default Container;