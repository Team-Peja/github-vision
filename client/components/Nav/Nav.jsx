import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from '../../assets/images/glasses.svg'

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  checkLogin() {
    if (!this.props.user) {
      <nav id="navigation" className="margin-right-xl">
      <ul className="fw-600 nav-container">
        <li className="hide-nav-link"><a href="">How it Works</a></li>
        <li className="hide-nav-link"><a href="/login">Log in with Github!</a></li>
      </ul>
      </nav>
    } else {
      <nav id="navigation" className="margin-right-xl">
      <ul className="fw-600 nav-container">
        <li className="hide-nav-link"><a href="">You are logged in!</a></li>
      </ul>
      </nav>
    }
  }

  render() {
    return (
      <div id="Nav" className="bg-gr0 padding-left-xl padding-right-xl box-shadow-light">
        <div id="logo">
          <img src={logo} />
          <h4 className="raleway text-gr3 margin-left-m">Git Visual</h4>
        </div>
        {this.checkLogin()}
      </div>
    )
  }
}

export default Nav;