import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';

import PeerAssessmentView from 'views/PeerAssessmentView';
import SelfAssessmentView from 'views/SelfAssessmentView';
import StudentTrainingView from 'views/StudentTrainingView';
import SubmissionView from 'views/SubmissionView';
import messages from './messages';
import routes from './routes';

const RouterRoot = () => {
  const { formatMessage } = useIntl();

  return (
    <Router>
      <Switch>
        <Route path={routes.peerAssessment}>
          <PeerAssessmentView />
        </Route>
        <Route path={routes.selfAssessment}>
          <SelfAssessmentView />
        </Route>
        <Route path={routes.studentTraining}>
          <StudentTrainingView />
        </Route>
        <Route path={routes.submission}>
          <SubmissionView />
        </Route>
        <Route path={routes.root}>
          <ErrorPage message={formatMessage(messages.error404Message)} />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterRoot;
