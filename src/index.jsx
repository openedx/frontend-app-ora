import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import App from './App';

import messages from './i18n';

import './index.scss';

const queryClient = new QueryClient({
  queries: { retry: false },
});

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
});
