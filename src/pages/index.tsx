import React, { useState, useMemo, useCallback } from 'react';
import { Box } from 'grommet';
import { graphql, useStaticQuery } from 'gatsby';
import GithubCorner from '../components/GithubCorner';
import Footer from '../components/Footer';
import ModalEvent from '../components/ModalEvent';
import Month from '../components/Calendar/Month';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import groupEventsByMonth from '../utils/groupEventsByMonth';
import { format } from 'date-fns';

// override this query with your own questions!
const SPREADSHEET_QUERY = graphql`
  query eventsQuery {
    site {
      siteMetadata {
        limitMonthInTheFuture
      }
    }

    allGoogleSheetFormResponses1Row {
      edges {
        node {
          eventName: naamvandeshow
          date: welkedatumwiltuboeken
          timestamp
          emailaddress
        }
      }
    }
  }
`;

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const { allGoogleSheetFormResponses1Row, site } = useStaticQuery(
    SPREADSHEET_QUERY,
  );
  const { limitMonthInTheFuture } = site.siteMetadata;

  const months = useMemo(
    () =>
      groupEventsByMonth(
        allGoogleSheetFormResponses1Row.edges,
        limitMonthInTheFuture,
      ),
    [allGoogleSheetFormResponses1Row.edges, limitMonthInTheFuture],
  );

  const openModal = useCallback((data: ModalData) => {
    setModalData(data);
    setShowModal(true);
  }, []);

  return (
    <Layout>
      <Hero />

      <Box id="calendars" animation="fadeIn">
        {months.map((month) => (
          <Month
            key={format(month.startDate, 'MM')}
            openModal={openModal}
            {...month}
          />
        ))}
      </Box>
      {showModal && (
        <ModalEvent onClose={() => setShowModal(false)} {...modalData!} />
      )}

      <GithubCorner href="https://github.com/EmaSuriano/gatsby-starter-event-calendar" />
      <Footer />
    </Layout>
  );
};

export default CalendarPage;
