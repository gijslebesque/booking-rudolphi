// const template = path.resolve(`./src/templates/index.js`);

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  //   const result = await graphql(`
  //     {
  //       allCosmicjsShows {
  //         edges {
  //           node {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   `);
  //   if (result.errors) {
  //     console.error(result.errors);
  //   }

  //   console.log(result);

  //   result.data.allCosmicjsShows.edges.forEach(({ node }) => {
  //     console.log(node);
  //   });
};

//   createPage({
//     path: ,
//     component: template,
//     context: {
//       index,
//     },
//   });
// };
// }
