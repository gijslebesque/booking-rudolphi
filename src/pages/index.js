import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';

import { normaliseDataGrid } from '../utils/normaliseData';
const IndexPage = ({
  data: {
    allCosmicjsShows: { edges: data },
  },
}) => {
  const rows = normaliseDataGrid(data);
  return (
    <Layout rows={rows}>
      <SEO title="Home" />
      {rows.map((r, i) => (
        <div key={i} className="card">
          <Link to={r.link}>
            <img src={r.img} alt={r.showName} />
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query indexQuery {
    allCosmicjsShows {
      edges {
        node {
          metadata {
            show_name
            show_image {
              imgix_url
            }
          }
          slug
        }
      }
    }
  }
`;

export default IndexPage;
