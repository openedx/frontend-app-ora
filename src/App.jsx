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
import FilePreviewView from 'views/FilePreviewView';
import messages from './messages';
import routes from './routes';

const RouterRoot = () => {
  const { formatMessage } = useIntl();
  const appRoute = (route, Component) => (
    <Route path={route} element={<AppContainer Component={Component} />} />
  );
  const modalRoute = (route, Component, title) => (
    <Route path={route} element={<ModalContainer {...{ title, Component }} />} />
  );

  const embeddedRoutes = [
    <Route path={routes.embedded.xblock} element={<XBlockView />} />,
    modalRoute(routes.embedded.peerAssessment, PeerAssessmentView, 'ORA Peer Assessment'),
    modalRoute(routes.embedded.selfAssessment, SelfAssessmentView, 'ORA Self Assessment'),
    modalRoute(routes.embedded.studentTraining, StudentTrainingView, 'ORA Student Training'),
    modalRoute(routes.embedded.submission, SubmissionView, 'ORA Submission'),
    modalRoute(routes.preview, FilePreviewView, 'File Preview'),
    <Route path={routes.embedded.root} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />,
  ];
  const baseRoutes = [
    appRoute(routes.xblock, PeerAssessmentView),
    appRoute(routes.peerAssessment, PeerAssessmentView),
    appRoute(routes.selfAssessment, SelfAssessmentView),
    appRoute(routes.studentTraining, StudentTrainingView),
    appRoute(routes.submission, SubmissionView),
    appRoute(routes.preview, FilePreviewView),
    <Route path={routes.root} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />,
  ];

  const isConfigLoaded = useIsORAConfigLoaded();
  const isPageLoaded = useIsPageDataLoaded();

  if (!isConfigLoaded || !isPageLoaded) {
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
