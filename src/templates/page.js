import React from 'react';
// import { Link } from 'gatsby';

const Page = data => {
  console.log(data);

  return (
    <>
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

export default Page;
