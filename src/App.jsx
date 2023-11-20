import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  AuthenticatedPageRoute,
  ErrorPage,
} from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';

import AssessmentView from 'views/AssessmentView';
import SubmissionView from 'views/SubmissionView';
import XBlockView from 'views/XBlockView';
import GradeView from 'views/GradeView';

import AppContainer from 'components/AppContainer';
import ModalContainer from 'components/ModalContainer';

import { useRefreshPageData } from 'hooks/app';
import { useRefreshUpstream } from 'hooks/modal';
import { useUpdateTestProgressKey } from 'hooks/test';

import messages from './messages';
import routes from './routes';

const App = () => {
  /*
  const { body } = document;
  const refreshPageData = useRefreshPageData();
  const refreshUpstream = useRefreshUpstream();
  React.useEffect(() => {
    const resizeEvent = () => {
      // const { clientHeight, scrollHeight, offsetHeight } = body;
      const height = body.scrollHeight;
      if (document.referrer !== '' && height !== 0) {
        window.parent.postMessage(
          { type: 'ora-resize', payload: { height } },
          document.referrer,
        );
      }
    };
    resizeEvent();
    window.addEventListener('resize', resizeEvent);
  }, [body.scrollHeight]);

  React.useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'plugin.modal-close') {
        refreshPageData();
      }
    });
  }, []);
  */

  const { formatMessage } = useIntl();

  // test
  useUpdateTestProgressKey();

  const pageWrapper = (children) => (
    <AuthenticatedPageRoute>
      <AppContainer>
        {children}
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
  const modalRoute = (route, Component, title) => (
    <Route
      key={route}
      path={route}
      element={pageWrapper(
        <ModalContainer title={title}>
          <Component />
        </ModalContainer>,
      )}
    />
  );

  /*
  const embeddedRoutes = [
    <Route key="embedXblock" path={routes.xblockEmbed} element={<XBlockView />} />,
    modalRoute(routes.peerAssessmentEmbed, PeerAssessmentView, 'ORA Peer Assessment'),
    modalRoute(routes.selfAssessmentEmbed, SelfAssessmentView, 'ORA Self Assessment'),
    modalRoute(routes.studentTrainingEmbed, StudentTrainingView, 'ORA Student Training'),
    modalRoute(routes.submissionEmbed, SubmissionView, 'ORA Submission'),
    modaleoute(routes.gradedEmbed, GradeView, 'My Grade'),
    <Route
      key="embedError"
      path={routes.rootEmbed}
      element={<ErrorPage message={formatMessage(messages.error404Message)} />}
    />,
  ];
  */
  const baseRoutes = [
    appRoute(routes.xblock, XBlockView),
    modalRoute(routes.peerAssessment, AssessmentView, 'Assess your peers'),
    modalRoute(routes.selfAssessment, AssessmentView, 'Assess yourself'),
    modalRoute(routes.studentTraining, AssessmentView, 'Practice grading'),
    modalRoute(routes.submission, SubmissionView, 'Your response'),
    modalRoute(routes.graded, GradeView, 'My Grade'),
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
