import React from 'react';
import { when } from 'jest-when';
import { useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { screen, getAllByRole } from '@testing-library/dom';
import { act } from '@testing-library/react';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

import fakeData from 'data/services/lms/fakeData';
import { loadState } from 'data/services/lms/fakeData/dataStates';
import { paths } from 'data/services/lms/urls';

import { stepNames, stepRoutes } from 'constants/index';
import { progressKeys } from 'constants/mockData';

import {
  courseId,
  xblockId,
  baseUrl,
  config,
  getProgressKeys,
  stepOrders,
} from './constants';
import {
  mockQuerySelector,
  post,
  pageDataUrl,
  loadApp,
  mockPost,
} from './utils';

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
jest.mock('components/HotjarSurvey', () => 'hot-jar-survey');

jest.unmock('react');
jest.unmock('@openedx/paragon');
jest.unmock('@openedx/paragon/icons');

mockQuerySelector();

when(getConfig).calledWith().mockReturnValue(config);
when(getAuthenticatedHttpClient).calledWith().mockReturnValue({ post });
when(useParams).calledWith().mockReturnValue({ courseId, xblockId });

let el;
let store;
let user;

const testResponseSubmission = () => {
  test('response submission and success state', async () => {
    let resolve;
    const promise = new Promise(r => { resolve = r; });
    mockPost(`${baseUrl}${paths.submit}`, promise);
    const state = loadState({ view: stepRoutes.submission });
    mockPost(pageDataUrl(stepNames.submission), { body: {}, response: state });
    ({ el, store } = await loadApp('submission', stepNames.submission));
    await screen.findByText('Create response');
    const response = 'This is a test response';
    const inputs = screen.getAllByLabelText('Your response (Optional)');
    await user.type(inputs[0], response);
    await user.type(inputs[1], response);
    const submitEl = screen.getByText('Submit response');
    await user.click(submitEl);
    await el.findByText('Are you sure', { exact: false });
    await user.click(el.getAllByText('Submit response')[1]);
    await el.findByText('Submitting response');
    await act(async () => { await resolve({ data: {} }); });
    await screen.findByText('Submission Completed');
  });
};

/*
const testSelfAssessmentSubmission = () => {
  test('Self assessment submission and success state', async () => {
  });
};

const testPeerAssessmentSubmission = () => {
};
*/

const testStudentTrainingSubmission = (progressKey) => {
  test('Student Training assessment submission and success state', async () => {
    let resolve;
    const promise = new Promise(r => { resolve = r; });
    const state = loadState({ view: stepRoutes[stepNames.studentTraining], progressKey });
    when(post)
      .calledWith(`${baseUrl}${paths.submitAssessment}`, expect.anything())
      .mockReturnValueOnce(promise)
      .calledWith(pageDataUrl(stepNames.studentTraining), expect.anything())
      .mockResolvedValue({ data: state })
      .calledWith(pageDataUrl(), expect.anything())
      .mockResolvedValue({ data: state });

    mockPost(pageDataUrl(stepNames.studentTraining), { body: {}, response: state });
    const stepInfo = state.progress.step_info[stepNames.studentTraining];

    ({ el, store } = await loadApp(progressKey, stepNames.studentTraining));
    const { title } = fakeData.oraConfig.assessmentText;
    await screen.findByText(title);
    const criteria = await screen.findAllByRole('radiogroup');
    const updates = [];
    Object.keys(stepInfo.expected_rubric_selections).forEach((cIndex) => {
      const oIndex = stepInfo.expected_rubric_selections[cIndex];
      const radios = getAllByRole(criteria[cIndex], 'radio');
      const update = userEvent.click(radios[oIndex]);
      updates.push(update);
    });
    await Promise.all(updates);
    await user.click(screen.getByText('Submit practice grade'));
    await screen.findByText('Submitting grade');
    const { formFields } = store.getState().app;
    await resolve({ data: formFields });
    await screen.findByText('Submitted assessment');
    el.unmount();
  });
};

describe('Integration smoke tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    user = userEvent.setup();
  });
  afterEach(() => {
    if (el && el.unmount) {
      el.unmount();
    }
  });
  describe.each(Object.keys(stepOrders))('For step order %s', (stepOrder) => {
    const oraConfig = { ...fakeData.oraConfig.assessmentText };
    oraConfig.assessment_steps.order = stepOrders[stepOrder];

    beforeEach(() => {
      when(post)
        .calledWith(`${baseUrl}${paths.oraConfig}`, expect.anything())
        .mockResolvedValue({ data: oraConfig })
        .calledWith(`${baseUrl}${paths.oraConfig}`)
        .mockResolvedValue({ data: oraConfig });
    });

    const testModalView = ({ step }) => {
      const keys = getProgressKeys(stepOrder, step);
      if (keys.length === 0) { return; }
      const testProgressState = (progressKey) => {
        describe(`${progressKey} progress state`, () => {
          it('renders', async () => {
            const state = loadState({ view: stepRoutes[step], progressKey });
            when(post)
              .calledWith(pageDataUrl(step), expect.anything())
              .mockResolvedValue({ data: state });
            ({ el, store } = await loadApp(progressKey, step));
            const { title } = fakeData.oraConfig.assessmentText;
            await el.findByText(title);
          });
          if (
            step === stepNames.submission
            && [progressKeys.submissionUnsaved, progressKeys.submissionSaved].includes(progressKey)
          ) {
            testResponseSubmission();
          }
          /*
          if (step === stepNames.self) {
            testSelfAssessmentSubmission();
          }
          if (step === stepNames.peer) {
            testPeerAssessmentSubmission();
          }
          */
          if (
            step === stepNames.studentTraining
            && [progressKeys.studentTraining, progressKeys.studentTrainingPartial].includes(progressKey)
          ) {
            testStudentTrainingSubmission(progressKey);
          }
        });
      };
      keys.forEach(testProgressState);
    };

    describe('xblock view', () => {
      const keys = getProgressKeys(stepOrder, stepNames.xblock);
      it.each([keys[0]])('renders %s progress state', async (progressKey) => {
        const state = loadState({
          view: stepNames.xblock,
          progressKey,
        });
        mockPost(pageDataUrl(), { body: {}, response: state });
        ({ store, el } = await loadApp(progressKey, stepNames.xblock));
        const { title } = fakeData.oraConfig.assessmentText;
        await el.findByText(title);
      });
    });
    describe('studentTraining view', () => {
      testModalView({ step: stepNames.studentTraining });
    });
    describe('submission view', () => {
      testModalView({ step: stepNames.submission });
    });
    describe('self assessment view', () => {
      testModalView({ step: stepNames.self });
    });
    describe('peer assessment view', () => {
      testModalView({ step: stepNames.peer });
    });
    describe('graded view', () => {
      testModalView({ step: stepNames.done });
    });
  });
});
