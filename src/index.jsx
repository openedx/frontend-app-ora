import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
  const isDev = process.env.NODE_ENV === 'development';
  const rootEl = document.getElementById('root');
  if (isDev) {
    setTimeout(() => {
      // This is a hack to prevent the Paragon Modal overlay stop query devtools from clickable
      rootEl.removeAttribute('data-focus-on-hidden');
      rootEl.removeAttribute('aria-hidden');
    }, 3000);
  }
  ReactDOM.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        { isDev && <ReactQueryDevtools /> }
      </QueryClientProvider>
    </AppProvider>,
    rootEl,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
});

const resizeEvent = () => {
  const height = document.body.scrollHeight;
  if (document.referrer !== '') {
    window.parent.postMessage(
      {
        type: 'ora-resize',
        payload: { height },
      },
      document.referrer,
    );
  }
};
window.onload = () => resizeEvent();
window.onresize = () => resizeEvent();
