import React from 'react';
import Logo from '../images/menu_logo.gif';

import { Link } from 'gatsby';
export default function SideNav({ setShowSideNav, rows }) {
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

export const query = graphql`
  query navQuery {
    allCosmicjsShows {
      edges {
        node {
          metadata {
            show_name
          }
          slug
        }
      }
    }
  }
`;
