import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from '../../assets/images/glasses.svg'

class Nav extends Component {
  render() {
    return (
      <div id="Nav">
        <div id="logo">
          <img src={logo} />
          <h4 className="align-vertical">Git Visual</h4>
        </div>
        <div></div>
        <nav id="navigation">
        <ul className="fw-600 nav-container">
          <li className="hide-nav-link"><a href="">How it Works</a></li>
          <li className="hide-nav-link"><a href="">Log in with Github!</a></li>
        </ul>
        </nav>
      </div>
    )
  }
}

export default Nav;