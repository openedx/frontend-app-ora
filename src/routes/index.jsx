import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';

import Assessment from './assessment';
import Submission from './submission';
import messages from './messages';

const RouterRoot = () => {
  const { formatMessage } = useIntl();

  return (
    <Router>
      <Switch>
        <Route path="/assessment/:id">
          <Assessment />
        </Route>
        <Route path="/submission/:id">
          <Submission />
        </Route>
        <Route path="/*">
          <ErrorPage message={formatMessage(messages.error404Message)} />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterRoot;
