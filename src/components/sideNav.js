import React from 'react';
import Logo from '../images/menu_logo.gif';

export default function SideNav({ setShowSideNav }) {
  return (
    <div
      className="side-nav-window"
      onClick={(e) => {
        e.stopPropagation();
        setShowSideNav(false);
      }}
    >
      <div className="side-nav" onClick={(e) => e.stopPropagation()}>
        <img className="side-nav-logo" src={Logo} alt="Menu logo" />
      </div>
    </div>
  );
}
