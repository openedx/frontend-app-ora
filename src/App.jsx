import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';

import AssessmentView from 'views/AssessmentView';
import SubmissionView from 'views/SubmissionView';
import XBlockView from 'views/XBlockView';
import XBlockStudioView from 'views/XBlockStudioView';
import GradeView from 'views/GradeView';

import PageRoute from 'components/PageRoute';

import { useHandleModalCloseEvent } from 'hooks/modal';

import messages from './messages';
import routes from './routes';

const App = () => {
  const { formatMessage } = useIntl();
  const handleModalClose = useHandleModalCloseEvent();

  React.useEffect(() => {
    window.addEventListener('message', handleModalClose);
    return () => window.removeEventListener('message', handleModalClose);
  }, [handleModalClose]);

  return (
    <Routes>
      <Route
        path={routes.xblock}
        element={(<PageRoute><XBlockView /></PageRoute>)}
      />
      <Route
        path={routes.xblockStudio}
        element={(<PageRoute><XBlockStudioView /></PageRoute>)}
      />
      <Route
        path={routes.xblockPreview}
        element={(<PageRoute><XBlockView /></PageRoute>)}
      />
      <Route
        path={routes.peerAssessment}
        element={(<PageRoute isModal><AssessmentView /></PageRoute>)}
      />
      <Route
        path={routes.selfAssessment}
        element={(<PageRoute isModal><AssessmentView /></PageRoute>)}
      />
      <Route
        path={routes.studentTraining}
        element={(<PageRoute isModal><AssessmentView /></PageRoute>)}
      />
      <Route
        path={routes.submission}
        element={(<PageRoute isModal><SubmissionView /></PageRoute>)}
      />
      <Route
        path={routes.graded}
        element={(<PageRoute isModal><GradeView /></PageRoute>)}
      />
      <Route
        key="error"
        path={routes.root}
        element={<ErrorPage message={formatMessage(messages.error404Message)} />}
      />
    </Routes>
  );
};

export default App;
