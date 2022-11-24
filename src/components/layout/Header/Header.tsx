import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import BreadcrumbTrail from '../Breadcrumbs/Breadcrumbs';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Header = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <header id="header" className="header">
      <BreadcrumbTrail breadcrumbs={breadcrumbs} />

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
