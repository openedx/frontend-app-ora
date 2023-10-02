import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Spinner } from '@edx/paragon';

import { useIsORAConfigLoaded, useIsPageDataLoaded } from 'data/services/lms/hooks/selectors';

import AppContainer from 'views/AppContainer';
import ModalContainer from 'views/ModalContainer';
import PeerAssessmentView from 'views/PeerAssessmentView';
import SelfAssessmentView from 'views/SelfAssessmentView';
import StudentTrainingView from 'views/StudentTrainingView';
import SubmissionView from 'views/SubmissionView';
import XBlockView from 'views/XBlockView';
import PageDataProvider from 'components/PageDataProvider';

import messages from './messages';
import routes from './routes';

const RouterRoot = () => {
  const { formatMessage } = useIntl();
  const appRoute = (route, Component) => (
    <Route
      path={route}
      element={(
        <PageDataProvider>
          <AppContainer Component={Component} />
        </PageDataProvider>
      )}
    />
  );
  const modalRoute = (route, Component, title) => (
    <Route
      path={route}
      element={(
        <PageDataProvider>
          <ModalContainer {...{ title, Component }} />
        </PageDataProvider>
      )}
    />
  );

  const embeddedRoutes = [
    <Route path={routes.xblockEmbed} element={<XBlockView />} />,
    modalRoute(routes.peerAssessmentEmbed, PeerAssessmentView, 'ORA Peer Assessment'),
    modalRoute(routes.selfAssessmentEmbed, SelfAssessmentView, 'ORA Self Assessment'),
    modalRoute(routes.studentTrainingEmbed, StudentTrainingView, 'ORA Student Training'),
    modalRoute(routes.submissionEmbed, SubmissionView, 'ORA Submission'),
    <Route path={routes.rootEmbed} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />,
  ];
  const baseRoutes = [
    appRoute(routes.xblock, PeerAssessmentView),
    appRoute(routes.peerAssessment, PeerAssessmentView),
    appRoute(routes.selfAssessment, SelfAssessmentView),
    appRoute(routes.studentTraining, StudentTrainingView),
    appRoute(routes.submission, SubmissionView),
    <Route path={routes.root} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />,
  ];

  const isConfigLoaded = useIsORAConfigLoaded();

  if (!isConfigLoaded) {
    return (
      <div className="h-screen d-flex justify-content-center align-items-center">
        <Spinner
          animation="border"
          variant="primary"
          className="mr-3 spinner-md"
          screenReaderText="loading"
        />
      </div>
    );
  }

  return (
    <Routes>
      {embeddedRoutes}
      {baseRoutes}
    </Routes>
  );
};

export default RouterRoot;
