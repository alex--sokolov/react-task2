import React from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header" className="header">
      <NavLink end to="/" data-testid="main-link">
        Main
      </NavLink>
      <NavLink to="/about" data-testid="about-link">
        About
      </NavLink>
      <NavLink to="/forms" data-testid="forms-link">
        Forms
      </NavLink>
    </header>
  );
};

export default Header;
