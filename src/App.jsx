import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  AuthenticatedPageRoute,
  ErrorPage,
} from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { SkeletonTheme } from '@edx/paragon';

import AssessmentView from 'views/AssessmentView';
import SubmissionView from 'views/SubmissionView';
import XBlockView from 'views/XBlockView';
import XBlockStudioView from 'views/XBlockStudioView';
import GradeView from 'views/GradeView';

import AppContainer from 'components/AppContainer';
import ModalContainer from 'components/ModalContainer';

import { useRefreshPageData } from 'hooks/app';
import { useUpdateTestProgressKey } from 'hooks/testHooks';

import messages from './messages';
import routes from './routes';

const App = () => {
  const refreshPageData = useRefreshPageData();
  React.useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'plugin.modal-close') {
        refreshPageData();
      }
    });
  }, [refreshPageData]);

  const { formatMessage } = useIntl();

  // test
  useUpdateTestProgressKey();

  const pageWrapper = (children) => (
    <AuthenticatedPageRoute>
      <AppContainer>
        <SkeletonTheme baseColor="#888" highlightColor="#444">
          {children}
        </SkeletonTheme>
      </AppContainer>
    </AuthenticatedPageRoute>
  );
  const appRoute = (route, Component) => (
    <Route
      path={route}
      key={route}
      element={pageWrapper(<Component />)}
    />
  );
  const modalRoute = (route, Component) => (
    <Route
      key={route}
      path={route}
      element={pageWrapper(
        <ModalContainer>
          <Component />
        </ModalContainer>,
      )}
    />
  );

  /*
  const embeddedRoutes = [
    <Route key="embedXblock" path={routes.xblockEmbed} element={<XBlockView />} />,
    <Route key="embedXblockStudio" path={routes.xblockStudioEmbed} element={<XBlockStudioView />} />,
    <Route key="embedXblockPreview" path={routes.xblockPreviewEmbed} element={<XBlockView />} />,
    modalRoute(routes.peerAssessmentEmbed, PeerAssessmentView, 'ORA Peer Assessment'),
    modalRoute(routes.selfAssessmentEmbed, SelfAssessmentView, 'ORA Self Assessment'),
    modalRoute(routes.studentTrainingEmbed, StudentTrainingView, 'ORA Student Training'),
    modalRoute(routes.submissionEmbed, SubmissionView, 'ORA Submission'),
    modalRoute(routes.gradedEmbed, GradeView, 'My Grade'),
    <Route
      key="embedError"
      path={routes.rootEmbed}
      element={<ErrorPage message={formatMessage(messages.error404Message)} />}
    />,
  ];
  */
  const baseRoutes = [
    appRoute(routes.xblock, XBlockView),
    appRoute(routes.xblockStudio, XBlockStudioView),
    appRoute(routes.xblockPreview, XBlockView),
    modalRoute(routes.peerAssessment, AssessmentView),
    modalRoute(routes.selfAssessment, AssessmentView),
    modalRoute(routes.studentTraining, AssessmentView),
    modalRoute(routes.submission, SubmissionView),
    modalRoute(routes.graded, GradeView),
    <Route key="error" path={routes.root} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />,
  ];

  return (
    <Routes>
      {/* embeddedRoutes */}
      {baseRoutes}
    </Routes>
  );
};

export default App;
