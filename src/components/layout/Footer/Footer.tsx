import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="github">
        App developer:{' '}
        <a href="http://github.com/alex--sokolov" target="_blank" rel="noreferrer">
          Alex Sokolov
        </a>
      </div>
      <div className="year">2022</div>
    </footer>
  );
};

export default Footer;
