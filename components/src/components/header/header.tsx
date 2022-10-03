import React, { Component } from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render(): React.ReactNode {
    return (
      <header id="header" className="header">
        <NavLink
          to="/"
          data-testid="main-link"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Main
        </NavLink>
        <NavLink
          to="/about"
          data-testid="about-link"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          About
        </NavLink>
      </header>
    );
  }
}

export default Header;
