import React, { Component } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import logo from '../../assets/images/glasses.svg';

const currentYear = moment().format('YYYY');

const Footer = () => 
  (
    <div id="footer" className="bg-gr0 center-content">
      <img style={{ width: '75px' }} src={logo} />
      <small className="text-gr3 margin-top">
        &copy; Copyright {currentYear} <a href="" target="_blank">Github Visual</a>. Distributed under the <a href="" target="_blank">MIT License</a>.
      </small>
    </div>
  )


export default Footer;