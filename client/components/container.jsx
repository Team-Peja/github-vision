import React, { Component } from 'react';
import { render } from 'react-dom';


//App components
import Nav from './Nav/Nav.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { user: false, userInfo: {}, commits: [] };
  }

  //do fetch for authorization here
  componentWillMount() {
    fetch('/checkCookie', {credentials: 'include'}).then(response => response.json()).then(data => {
      this.setState({ user: data.isLoggedIn, userInfo: data.user, commits: data.commits})});
  }

  render() {
    return (
    <div id="container">
      <Nav user={this.state.user} />
      <Main user={this.state.user} commits={this.state.commits} userInfo={this.state.userInfo} />
      <Footer />
    </div>
    )
  }
}

export default Container;