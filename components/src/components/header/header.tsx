import React, { Component } from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render(): React.ReactNode {
    return (
      <header id="header" className="header">
        <NavLink to="/main" data-testid="main-link">
          Main
        </NavLink>
        <NavLink to="/about" data-testid="about-link">
          About
        </NavLink>
      </header>
    );
  }
}

export default Header;
