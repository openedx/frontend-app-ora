import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { when } from 'jest-when';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IntlProvider } from '@edx/frontend-platform/i18n';

import App from 'App';

import { stepRoutes } from 'constants/index';

import { createStore } from 'data/store';
import {
  courseId,
  xblockId,
  baseUrl,
} from './constants';

export const mockQuerySelector = () => {
  jest.spyOn(document, 'querySelector').mockImplementation((selector) => (
    selector === 'html' ? { scrollTo: jest.fn() } : selector
  ));
};

export const post = jest.fn();

const basePageUrl = `${baseUrl}/get_learner_data/`;
export const pageDataUrl = (view = undefined) => (view ? `${basePageUrl}${view}` : basePageUrl);
export const loadApp = async (progressKey, step) => {
  const store = createStore(false);
  const queryClient = new QueryClient({ queries: { retry: false } });
  const route = stepRoutes[step];
  const location = `/${route}/${courseId}/${xblockId}/`;
  const el = render(
    <IntlProvider locale="en">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[location]}>
            <App />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    </IntlProvider>,
  );
  return {
    el,
    store,
  };
};

export const mockPost = (url, { response }) => when(post)
  .calledWith(url, expect.anything()).mockResolvedValue({ data: response })
  .calledWith(url).mockResolvedValue({ data: response }); // eslint-disable-line newline-per-chained-call
