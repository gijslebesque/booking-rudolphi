import React from 'react';
import SEO from '../components/seo';
import Layout from '../components/layout';
// import { Link } from 'gatsby';
import { normaliseDataGrid } from '../utils/normaliseData';

const Page = ({ pageContext: { node }, data }) => {
  const showData = {
    ...node.metadata,
  };

  console.log(data.allCosmicjsShows);
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
              <a href={showData.link_to_show} target="_blank">
                {showData.show_name}
              </a>
            </p>
          </div>
        </div>

        <div className="calendar">
          <h1>Beschikbaarheid</h1>
        </div>
      </Layout>

      {/* <Layout>
        <SEO
          title={title}
          description={`This page is about proorganica: ${
            metadata.excerpt && metadata.excerpt
          }`}
        />
        <div className="container">
          <article className="content">
            <h1 className="content-title">{title && title}</h1>
            <i>{metadata.excerpt && metadata.excerpt}</i>
            {metadata.main_image && (
              <figure className="post-feature-image padding-horizontal-2">
                <ImageCard
                  className="post-card-image"
                  alt={title}
                  filename={metadata && metadata.main_image.url}
                ></ImageCard>
              </figure>
            )}
            <section className="post-full-content">
              <section
                className="content-body load-external-scripts"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </section>{" "}
            <div className="content-footer">
              {" "}
              <Link className="highlight-content" to={`/${randomSlug}`}>
                {randomSlug.replace("-", " ")}{" "}
                <FontAwesomeIcon icon={faArrowRight} />{" "}
              </Link>
            </div>{" "}
          </article>
        </div>
      </Layout> */}
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
