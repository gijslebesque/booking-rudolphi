import React from 'react';
import SEO from '../components/seo';
import Layout from '../components/layout';
import { normaliseDataGrid } from '../utils/normaliseData';
import { useStaticQuery, graphql } from 'gatsby';

import Calender from '../components/calendar';

const Page = ({ pageContext: { node } }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allGoogleSheetFormResponses1Row {
        edges {
          node {
            naamvandeshow
            welkedatumwiltuboeken
            status
          }
        }
      }
      allCosmicjsShows {
        edges {
          node {
            slug
            metadata {
              show_name
              show_image {
                imgix_url
              }
            }
          }
        }
      }
    }
  `);

  const showData = {
    ...node.metadata,
  };

  const rows = normaliseDataGrid(data.allCosmicjsShows.edges);
  let calenderDate = { confirmed: [], pending: [], cancelled: [] };

  data.allGoogleSheetFormResponses1Row.edges
    .map((e) => ({
      ...e.node,
    }))
    .filter((e) =>
      e.naamvandeshow.toLowerCase().includes(node.title.toLowerCase())
    )
    .forEach((s) => {
      const { status, welkedatumwiltuboeken } = s;
      if (String(status) === 'bevestigd') {
        calenderDate.confirmed.push(welkedatumwiltuboeken);
      } else if (String(status) === 'geannuleerd') {
        calenderDate.cancelled.push(welkedatumwiltuboeken);
      } else {
        calenderDate.pending.push(welkedatumwiltuboeken);
      }
    });
  return (
    <>
      <Layout rows={rows}>
        <SEO title={'home'} />
        <div className="flex show">
          <div className="show-img">
            <img src={showData.show_image.url} alt={showData.show_name} />

            <p className="margin-t-m" style={{ textAlign: 'center' }}>
              <strong>
                Van {new Date(showData.from).toLocaleDateString()} t/m{' '}
                {new Date(showData.to).toLocaleDateString()} <br />
              </strong>

              <strong className="hide-mobile">beschikbaarheid:</strong>
            </p>
            <div className="hide-mobile">
              <Calender
                requests={calenderDate}
                to={showData.to}
                from={showData.from}
              />
            </div>
          </div>
          <div>
            <div className="flex-between">
              <div>
                <h1>{showData.show_name}</h1>
                <h2 className="underline">{showData.theatre_name}</h2>
              </div>
              <a href="#google-form" className="btn btn-primary">
                Boek nu
              </a>
              <div className="show-mobile">
                <Calender
                  requests={calenderDate}
                  to={showData.to}
                  from={showData.from}
                />
              </div>
            </div>
            <div>
              <div
                className="about"
                dangerouslySetInnerHTML={{ __html: node.content }}
              ></div>
            </div>

            <p>{showData.show_credits}</p>
            {showData.link_to_show && (
              <p>
                <strong> Website:{'  '}</strong>
                <a
                  href={showData.link_to_show}
                  target="_blank"
                  rel="noreferrer"
                >
                  {showData.show_name}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="margin-t-m">
          <div className="flex-start flex-center margin-t-m">
            <iframe
              title="google-form"
              id="google-form"
              src="https://docs.google.com/forms/d/e/1FAIpQLScI1ED5-411gh5mkqk21XdqJtrSIHTOiWHUNC3UGm_bUiTiWQ/viewform?embedded=true"
              width="100%"
              height="900"
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

export default Page;
