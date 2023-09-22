import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Spinner } from '@edx/paragon';

import { useIsORAConfigLoaded, useIsPageDataLoaded } from 'data/services/lms/hooks/selectors';

import PeerAssessmentView from 'views/PeerAssessmentView';
import SelfAssessmentView from 'views/SelfAssessmentView';
import StudentTrainingView from 'views/StudentTrainingView';
import SubmissionView from 'views/SubmissionView';
import messages from './messages';
import routes from './routes';

const RouterRoot = () => {
  const { formatMessage } = useIntl();

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
      <Route path={routes.peerAssessment} element={<PeerAssessmentView />} />
      <Route path={routes.selfAssessment} element={<SelfAssessmentView />} />
      <Route path={routes.studentTraining} element={<StudentTrainingView />} />
      <Route path={routes.submission} element={<SubmissionView />} />
      <Route path={routes.root} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />
    </Routes>
  );
};

export default RouterRoot;
