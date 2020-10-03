import React from 'react';
import SEO from '../components/seo';
import Layout from '../components/layout';
import { normaliseDataGrid } from '../utils/normaliseData';

import Calender from '../components/calendar';

const Page = ({ pageContext: { node, calenderDate }, data }) => {
  const showData = {
    ...node.metadata,
  };

  console.log(node, calenderDate);
  const rows = normaliseDataGrid(data.allCosmicjsShows.edges);

  return (
    <>
      <Layout rows={rows}>
        <SEO title={'home'} />
        <div className="flex show">
          <div className="show-img">
            <img src={showData.show_image.url} alt={showData.show_name} />
          </div>
          <div>
            <h1>{showData.show_name}</h1>
            <h2 className="underline">{showData.theatre_name}</h2>
            <div
              className="about"
              dangerouslySetInnerHTML={{ __html: node.content }}
            ></div>

            <p>
              <strong> Website:{'  '}</strong>
              <a href={showData.link_to_show} target="_blank" rel="noreferrer">
                {showData.show_name}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h1>Beschikbaarheid</h1>

          <Calender requests={calenderDate} to={node.to} from={node.from} />
        </div>
      </Layout>
    </>
  );
};

export const query = graphql`
  query pageQueryForNav {
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

export default Page;
