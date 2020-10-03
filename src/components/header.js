import { Link } from 'gatsby';
import React from 'react';
import Logo from '../images/logo_rudolphi.svg';
import Menu from '../images/menu.svg';

const Header = () => (
  <header className="header container flex">
    <h1 className="header-logo">
      <Link to="/">
        <img src={Logo} alt="Via Rudolphi" />
      </Link>
    </h1>
    <nav>
      <img src={Menu} alt="Menu" />
    </nav>
  </header>
);

export default Header;
