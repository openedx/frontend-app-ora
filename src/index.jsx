import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { createRoot } from 'react-dom/client';

import store from 'data/store';

import App from './App';

import messages from './i18n';

import './index.scss';

const queryClient = new QueryClient({
  queries: { retry: false },
});

subscribe(APP_READY, () => {
  const isDev = process.env.NODE_ENV === 'development';
  const root = createRoot(document.getElementById('root'));

  root.render(
    <AppProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        { isDev && <ReactQueryDevtools /> }
      </QueryClientProvider>
    </AppProvider>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  const root = createRoot(document.getElementById('root'));

  root.render(<ErrorPage message={error.message} />);
});

initialize({
  messages,
});
