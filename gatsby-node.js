const path = require(`path`);

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type googleSheetEventsRow implements Node @dontInfer {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      timestamp: String
      whatisthename: String
      when: String
      linktotheevent: String
      where: String
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const dataFromCosmic = await graphql(`
    query {
      allCosmicjsShows {
        edges {
          node {
            slug
            title
            content
            metadata {
              link_to_show
              from
              capacity
              show_credits
              show_image {
                url
              }
              show_name
              theatre_name
              to
            }
          }
        }
      }
    }
  `);

  dataFromCosmic.data.allCosmicjsShows.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        node,
      },
    });
  });
};
