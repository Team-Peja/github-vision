import React, { Component } from 'react';
import { render } from 'react-dom';


//App components
import Nav from './Nav/Nav.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { user: false, hasCookie: undefined };
  }

  //do fetch for authorization here
  componentWillMount() {
    fetch('/checkCookie', {credentials: 'include'}).then(response => response.json()).then(data => {
      this.setState({ user: data.isLoggedIn})});
  }

  render() {
    return (
    <div id="container">
      <Nav user={this.state.user} cookie={this.state.hasCookie}/>
      <Main user={this.state.user} cookie={this.state.hasCookie}/>
      <Footer />
    </div>
    )
  }
}

export default Container;