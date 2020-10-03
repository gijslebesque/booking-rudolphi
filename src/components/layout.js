/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import SideNav from './sideNav';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="wrapper">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <SideNav />
      <main className="container">{children}</main>
      <footer className="footer container flex-between">
        <div>
          <h3>Contact</h3>
          <p>Theaterzaken Via Rudolphi</p>
          <p>Rombout Hogerbeetsstraat 109 - unit 36</p>
          <p>1052 VW Amsterdam</p>
          <p>Telefoon: 020-6277555</p>
          <p>
            E-mail:
            <a href="mailto: info@viarudolphi.nl"> info@viarudolphi.nl</a>
          </p>
        </div>
        <div className="align-end">
          © {new Date().getFullYear()}, Built by James & Gijs
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
