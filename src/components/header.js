import { Link } from 'gatsby';
import React, { useState } from 'react';
import Logo from '../images/logo_rudolphi.svg';
import Menu from '../images/menu.svg';
import SideNav from './sideNav';

const Header = () => {
  const [showSideNav, setShowSideNav] = useState(true);

  return (
    <header className="header container flex">
      <h1 className="header-logo">
        <Link to="/">
          <img src={Logo} alt="Via Rudolphi" />
        </Link>
      </h1>
      <nav onClick={() => setShowSideNav(true)}>
        <img src={Menu} alt="Menu" />
      </nav>
      {showSideNav && <SideNav setShowSideNav={setShowSideNav} />}
    </header>
  );
};

export default Header;
