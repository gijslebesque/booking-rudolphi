import React, { useState } from 'react';
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
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Layout rows={rows}>
        <SEO title={'home'} />
        <div className="flex show">
          <div className="show-img">
            <img src={showData.show_image.url} alt={showData.show_name} />
            <Calender requests={calenderDate} to={node.to} from={node.from} />
          </div>
          <div className="position-relative">
            <h1>{showData.show_name}</h1>
            <h2 className="underline">{showData.theatre_name}</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Boek nu
            </button>
            <div>
              <div
                className="about"
                dangerouslySetInnerHTML={{ __html: node.content }}
              ></div>
            </div>

            <p>
              <strong> Website:{'  '}</strong>
              <a href={showData.link_to_show} target="_blank" rel="noreferrer">
                {showData.show_name}
              </a>
            </p>
          </div>
        </div>

        <div>
          <div className="flex-start flex-center">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScI1ED5-411gh5mkqk21XdqJtrSIHTOiWHUNC3UGm_bUiTiWQ/viewform?embedded=true"
              width="600"
              height="500"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>
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
