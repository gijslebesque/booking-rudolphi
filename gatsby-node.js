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

  const dataFromGoogleForm = await graphql(`
    query {
      allGoogleSheetFormResponses1Row {
        edges {
          node {
            contactnaam
            emailaddress
            naamvandeshow
            opmerking
            timestamp
            welkedatumwiltuboeken
            status
          }
        }
      }
    }
  `);

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
    let calenderDate = { confirmed: [], pending: [], cancelled: [] };
    dataFromGoogleForm.data.allGoogleSheetFormResponses1Row.edges.forEach(i => {
      const {
        node: { naamvandeshow, welkedatumwiltuboeken, status }
      } = JSON.parse(JSON.stringify(i));

      if (naamvandeshow.toLowerCase().includes(node.title.toLowerCase())) {
        if (String(status) === 'bevestigd') {
          calenderDate.confirmed.push(welkedatumwiltuboeken);
        } else if (String(status) === 'geannuleerd') {
          calenderDate.cancelled.push(welkedatumwiltuboeken);
        } else {
          calenderDate.pending.push(welkedatumwiltuboeken);
        }
      }
    });
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        node,
        calenderDate
      }
    });
  });
};
