import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';

import AssessmentView from 'views/AssessmentView';
import SubmissionView from 'views/SubmissionView';
import messages from './messages';
import routes from './routes';

const RouterRoot = () => {
  const { formatMessage } = useIntl();

  return (
    <Router>
      <Switch>
        <Route path={routes.assessment}>
          <AssessmentView />
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
