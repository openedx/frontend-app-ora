import React from 'react';
import { render } from '@testing-library/react';
import { when } from 'jest-when';
import { MemoryRouter, useParams, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import App from 'App';
import { getConfig } from '@edx/frontend-platform';

import fakeData from 'data/services/lms/fakeData';
import { loadState } from 'data/services/lms/fakeData/dataStates';
import urls, { paths, useBaseUrl } from 'data/services/lms/urls';

import { stepNames, stepRoutes } from 'constants/index';
import { progressKeys } from 'constants/mockData';

import store from 'data/store';

jest.mock('@edx/frontend-platform/auth', () => ({
  ...jest.requireActual('@edx/frontend-platform/auth'),
  getAuthenticatedHttpClient: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
jest.mock('@edx/frontend-platform', () => ({
  ...jest.requireActual('@edx/frontend-platform'),
  getConfig: jest.fn(),
}));
jest.mock('@edx/frontend-platform/react', () => ({
  ...jest.requireActual('@edx/frontend-platform/react'),
  AuthenticatedPageRoute: ({ children }) => <auth-page-route>{children}</auth-page-route>,
}));

jest.unmock('react');
jest.unmock('@edx/paragon');

const post = jest.fn();
const lmsBaseUrl = 'test-base-url';
const courseId = 'test-course-id';
const xblockId = 'test-xblock-id';
const baseUrl = `${lmsBaseUrl}/courses/${courseId}/xblock/${xblockId}/handler`;
const config = {
  LMS_BASE_URL: lmsBaseUrl,
};
when(getConfig).calledWith().mockReturnValue(config);

when(getAuthenticatedHttpClient).calledWith().mockReturnValue({ post });
when(useParams).calledWith().mockReturnValue({ courseId, xblockId });

const renderApp = (route) => {
  const queryClient = new QueryClient({
    queries: { retry: false },
  });
  const location = `/${route}/${courseId}/${xblockId}/`;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[location]}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
};

const pageDataUrl = (view = undefined) => {
  const url = `${baseUrl}/get_learner_data/`;
  return view ? `${url}${view}` : url;
};

const loadApp = async (progressKey, step, hasSubmitted = false) => {
  const app = renderApp(stepRoutes[step]);
  return render(app);
};

const mockPageData = (url, { body, response }) => {
  when(post).calledWith(`${baseUrl}${paths.oraConfig}`, {})
    .mockResolvedValue({ data: fakeData.oraConfig.assessmentText });
  if (body) {
    when(post).calledWith(url, expect.anything()).mockResolvedValueOnce({ data: response });
  } else {
    when(post).calledWith(url).mockResolvedValueOnce({ data: response });
  }
};

let el;

global.scrollTo = jest.fn();

describe('XBlock views integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders', async () => {
    const url = pageDataUrl();
    const state = loadState({
      view: stepNames.xblock,
      progressKey: progressKeys.submissionUnsaved,
    });
    mockPageData(url, { body: {}, response: state });
    el = await loadApp(progressKeys.submissionUnsaved, stepNames.xblock);
    await el.findByText('Open Response Assessment');
  });
});
