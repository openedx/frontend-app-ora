import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';

import AssessmentView from 'views/AssessmentView';
import SubmissionView from 'views/SubmissionView';
import messages from './messages';
import routes from './routes';

const RouterRoot = () => {
  const { formatMessage } = useIntl();

  return (
    <Routes>
      <Route path={routes.assessment} element={<AssessmentView />} />
      <Route path={routes.submission} element={<SubmissionView />} />
      <Route path={routes.root} element={<ErrorPage message={formatMessage(messages.error404Message)} />} />
    </Routes>
  );
};

export default RouterRoot;
