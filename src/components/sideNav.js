import React, { useEffect, useRef } from 'react';
import Logo from '../images/menu_logo.gif';

import { Link } from 'gatsby';
export default function SideNav({ setShowSideNav, rows }) {
  const notificationEl = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (notificationEl.current) {
        notificationEl.current.style = 'transform: translateX(0%)';
      }
    }, 10);

    return () => (notificationEl.current.style = 'transform: translateX(120%)');
  });

  return (
    <div
      role="side-nav-window"
      className="side-nav-window"
      onClick={(e) => {
        e.stopPropagation();
        setShowSideNav(false);
      }}
    >
      <div
        style={{ transform: 'translateX(120%)' }}
        ref={notificationEl}
        className={`side-nav animate`}
        role="side-nav"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="side-nav-logo" src={Logo} alt="Menu logo" />
        <div className="side-nav-items flex-column margin-t-m">
          <Link to="/">Home</Link>
          {rows.map((r, i) => (
            <Link key={i} className="margin-t-s" to={'/' + r.link}>
              {r.showName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
