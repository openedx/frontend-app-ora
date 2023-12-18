import React from 'react';
import { when } from 'jest-when';
import { useParams } from 'react-router-dom';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

import fakeData from 'data/services/lms/fakeData';
import { loadState } from 'data/services/lms/fakeData/dataStates';
import { paths } from 'data/services/lms/urls';

import { stepNames, stepRoutes } from 'constants/index';

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
  mockPageData,
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
jest.unmock('@edx/paragon');

mockQuerySelector();

when(getConfig).calledWith().mockReturnValue(config);
when(getAuthenticatedHttpClient).calledWith().mockReturnValue({ post });
when(useParams).calledWith().mockReturnValue({ courseId, xblockId });

let el;

describe('Integration smoke tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe.each(Object.keys(stepOrders))('For step order %s', (stepOrder) => {
    const oraConfig = { ...fakeData.oraConfig.assessmentText };
    oraConfig.assessment_steps.order = stepOrders[stepOrder];
    when(post).calledWith(`${baseUrl}${paths.oraConfig}`, {})
      .mockResolvedValue({ data: oraConfig });
    const testModalView = ({ step }) => {
      const keys = getProgressKeys(stepOrder, step);
      if (keys.length === 0) { return; }
      it.each(keys)('renders %s progress state', async (progressKey) => {
        const state = loadState({ view: stepRoutes[step], progressKey });
        mockPageData(pageDataUrl(step), { body: {}, response: state });
        el = await loadApp(progressKey, step);
        await el.findAllByText('Create response');
      });
    };
    describe('xblock view', () => {
      const keys = getProgressKeys(stepOrder, stepNames.xblock);
      it.each(keys)('renders %s progress state', async (progressKey) => {
        const state = loadState({
          view: stepNames.xblock,
          progressKey,
        });
        mockPageData(pageDataUrl(), { body: {}, response: state });
        el = await loadApp(progressKey, stepNames.xblock);
        const { title } = fakeData.oraConfig.assessmentText;
        await el.findByText(title);
      });
    });
    describe('submission view', () => {
      testModalView({ step: stepNames.submission });
    });
    describe('studentTraining view', () => {
      testModalView({ step: stepNames.studentTraining });
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
