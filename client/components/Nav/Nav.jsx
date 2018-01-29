import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from '../../assets/images/glasses.svg'

class Nav extends Component {
  render() {
    return (
      <div id="menu">
        <div>
          <img style={{ width: '55px' }} src={logo} />
          <h4>Git Visual</h4>
        </div>
        <nav id="navigation" className="margin-right-xl">
        <ul className="fw-600">
          <span>
            <li className="hide-nav-link"><a href="">How it Works</a></li>
            <li className="hide-nav-link"><a href="">Log in with Github!</a></li>
          </span>
        </ul>
        </nav>
      </div>
    )
  }
}

export default Nav;