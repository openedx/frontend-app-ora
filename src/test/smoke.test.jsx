import React from 'react';
import { render } from '@testing-library/react';
import { when } from 'jest-when';
import { MemoryRouter, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import App from 'App';

import fakeData from 'data/services/lms/fakeData';
import { loadState } from 'data/services/lms/fakeData/dataStates';
import { paths } from 'data/services/lms/urls';

import { stepNames, stepRoutes } from 'constants/index';
import { progressKeys } from 'constants/mockData';

import { createStore } from 'data/store';

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
  // eslint-disable-next-line react/prop-types
  AuthenticatedPageRoute: ({ children }) => <auth-page-route>{children}</auth-page-route>,
}));
jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: jest.fn().mockResolvedValue({ data: 'fake file data' }),
}));
jest.mock('components/HotjarSurvey', () => 'HotjarSurvey');

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
  const store = createStore(false);
  const queryClient = new QueryClient({
    queries: { retry: false },
  });
  const location = `/${route}/${courseId}/${xblockId}/`;
  return (
    <IntlProvider locale="en">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[location]}>
            <App />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    </IntlProvider>
  );
};

const pageDataUrl = (view = undefined) => {
  const url = `${baseUrl}/get_learner_data/`;
  return view ? `${url}${view}` : url;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadApp = async (progressKey, step, hasSubmitted = false) => {
  const app = renderApp(stepRoutes[step]);
  return render(app);
};

const mockPageData = (url, { body, response }) => {
  when(post).calledWith(`${baseUrl}${paths.oraConfig}`, {})
    .mockResolvedValue({ data: fakeData.oraConfig.assessmentText });
  if (body) {
    when(post).calledWith(url, expect.anything()).mockResolvedValue({ data: response });
  } else {
    when(post).calledWith(url).mockResolvedValue({ data: response });
  }
};

let el;

global.scrollTo = jest.fn();

describe('Integration smoke tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const testModalView = ({ step, keys }) => {
    it.each(keys)('renders %s progress state', async (progressKey) => {
      const state = loadState({ view: stepRoutes[step], progressKey });
      mockPageData(pageDataUrl(step), { body: {}, response: state });
      el = await loadApp(progressKey, step);
      await el.findAllByText('Create response');
    });
  };
  describe('xblock view', () => {
    const xblockProgressKeys = Object.values(progressKeys);
    it.each(xblockProgressKeys)('renders %s progress state', async (progressKey) => {
      const state = loadState({
        view: stepNames.xblock,
        progressKey,
      });
      mockPageData(pageDataUrl(), { body: {}, response: state });
      el = await loadApp(progressKey, stepNames.xblock);
      await el.findByText('Open Response Assessment');
    });
  });
  describe('submission view', () => {
    const submissionProgressKeys = [
      progressKeys.submissionUnsaved,
      progressKeys.submissionSaved,
      progressKeys.studentTraining,
      progressKeys.studentTrainingPartial,
      progressKeys.selfAssessment,
      progressKeys.peerAssessment,
      progressKeys.peerAssessmentPartial,
      progressKeys.peerAssessmentWaiting,
      progressKeys.staffAfterPeer,
      progressKeys.graded,
    ];
    testModalView({ step: stepNames.submission, keys: submissionProgressKeys });
  });
  describe('studentTraining view', () => {
    const trainingProgressKeys = [
      progressKeys.studentTraining,
      progressKeys.studentTrainingPartial,
    ];
    testModalView({ step: stepNames.studentTraining, keys: trainingProgressKeys });
  });
  describe('self assessment view', () => {
    const selfProgressKeys = [progressKeys.selfAssessment];
    testModalView({ step: stepNames.self, keys: selfProgressKeys });
  });
  describe('peer assessment view', () => {
    const peerProgressKeys = [
      progressKeys.peerAssessment,
      progressKeys.peerAssessmentPartial,
      progressKeys.peerAssessmentWaiting,
      progressKeys.staffAfterPeer,
      progressKeys.graded,
    ];
    testModalView({ step: stepNames.peer, keys: peerProgressKeys });
  });
  describe('graded view', () => {
    const gradedProgressKeys = [progressKeys.graded];
    testModalView({ step: stepNames.done, keys: gradedProgressKeys });
  });
});
