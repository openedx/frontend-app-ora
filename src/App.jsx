import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Spinner } from '@edx/paragon';

import { useIsORAConfigLoaded, useIsPageDataLoaded } from 'data/services/lms/hooks/selectors';

import PeerAssessmentView from 'views/PeerAssessmentView';
import SelfAssessmentView from 'views/SelfAssessmentView';
import StudentTrainingView from 'views/StudentTrainingView';
import SubmissionView from 'views/SubmissionView';
import XBlockView from 'views/XBlockView';
import GradeView from 'views/GradeView';

import AppContainer from 'components/AppContainer';
import ModalContainer from 'components/ModalContainer';
import PageDataProvider from 'components/PageDataProvider';

import messages from './messages';
import routes from './routes';

const RouterRoot = () => {
  const { formatMessage } = useIntl();
  const appRoute = (route, Component) => (
    <Route
      path={route}
      element={(
        <AppContainer>
          <Component />
        </AppContainer>
      )}
    />
  );
  const modalRoute = (route, Component, title) => (
    <Route
      path={route}
      element={(
        <AppContainer>
          <ModalContainer title={title}>
            <Component />
          </ModalContainer>
        </AppContainer>
      )}
    />
  );

  const embeddedRoutes = [
    <Route path={routes.xblockEmbed} element={<XBlockView />} />,
    modalRoute(routes.peerAssessmentEmbed, PeerAssessmentView, 'ORA Peer Assessment'),
    modalRoute(routes.selfAssessmentEmbed, SelfAssessmentView, 'ORA Self Assessment'),
    modalRoute(routes.studentTrainingEmbed, StudentTrainingView, 'ORA Student Training'),
    modalRoute(routes.submissionEmbed, SubmissionView, 'ORA Submission'),
    modalRoute(routes.gradedEmbed, GradeView, 'My Grade'),
    <Route path={routes.rootEmbed} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />,
  ];
  const baseRoutes = [
    appRoute(routes.xblock, XBlockView),
    modalRoute(routes.peerAssessment, PeerAssessmentView, 'Assess your peers'),
    modalRoute(routes.selfAssessment, SelfAssessmentView, 'Assess yourself'),
    modalRoute(routes.studentTraining, StudentTrainingView, 'Practice grading'),
    modalRoute(routes.submission, SubmissionView, 'Your response'),
    modalRoute(routes.graded, GradeView, 'My Grade'),
    <Route path={routes.root} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />,
  ];

  return (
    <Routes>
      {embeddedRoutes}
      {baseRoutes}
    </Routes>
  );
};

export default RouterRoot;
