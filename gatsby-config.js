require('dotenv').config({});

const { COSMIC_BUCKET, COSMIC_READ_KEY } = process.env;
const buildCredentials = ({
  PROJECT_ID,
  PRIVATE_KEY,
  PRIVATE_KEY_ID,
  CLIENT_EMAIL
}) => ({
  type: 'service_account',
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY.replace(/(\\r)|(\\n)/g, '\n'),
  client_email: CLIENT_EMAIL,
  client_id: '',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${PROJECT_ID}%40appspot.gserviceaccount.com`
});
const SPREADSHEET_ID = '1fSSXxl-b6Jb5cXexB800gqQiV4eyd6NhXSQ4uTFWT4U';

module.exports = {
  siteMetadata: {
    title: `Rudolphi boeker`,
    description: `Boek een show.`,
    author: `Animated Spoon`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: SPREADSHEET_ID,
        worksheetTitle: 'Form responses 1',
        credentials: buildCredentials(process.env)
      }
    },
    {
      resolve: 'gatsby-source-cosmicjs',
      options: {
        bucketSlug: COSMIC_BUCKET,
        objectTypes: [`shows`],
        apiAccess: {
          read_key: COSMIC_READ_KEY
        },
        localMedia: true
      }
    }

    // 'gatsby-plugin-offline',
  ]
};
