import { when } from 'jest-when';

import { stepNames } from 'constants/index';

import * as actions from './actions';
import * as app from './app';
import * as assessment from './assessment';
import * as modalHooks from './modal';
import * as routingHooks from './routing';
import * as utils from './utils';
import exported from './index';

jest.mock('./actions', () => ({
  actions: 'test action hooks',
}));
jest.mock('./app', () => ({
  useGlobalState: jest.fn(),
}));
jest.mock('./assessment', () => ({
  assessment: 'test assessment hooks',
}));
jest.mock('./modal', () => ({
  modalHooks: 'test modal hooks',
}));
jest.mock('./routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('./utils', () => ({
  utils: 'test utils',
}));

when(routingHooks.useViewStep).calledWith().mockReturnValue(stepNames.xblock);
when(app.useGlobalState).calledWith(expect.anything()).mockReturnValue({
  activeStepName: stepNames.peer,
});

describe('app-level hooks index', () => {
  describe('useIsRevisit', () => {
    describe('behavior', () => {
      it('loads viewStep and global state from hooks', () => {
        exported.useIsRevisit();
        expect(routingHooks.useViewStep).toHaveBeenCalled();
        expect(app.useGlobalState).toHaveBeenCalled();
      });
    });
    describe('output', () => {
      it('returns false if view step is xblock', () => {
        expect(exported.useIsRevisit()).toBe(false);
        when(app.useGlobalState).calledWith(expect.anything()).mockReturnValueOnce({
          activeStepName: stepNames.submission,
        });
        expect(exported.useIsRevisit()).toBe(false);
      });
      it('returns false if not exblock and activeStepName matches view step', () => {
        when(routingHooks.useViewStep).calledWith().mockReturnValueOnce(stepNames.peer);
        expect(exported.useIsRevisit()).toBe(false);
      });
      it('returns true if activeStepName does not match view step', () => {
        when(routingHooks.useViewStep).calledWith().mockReturnValueOnce(stepNames.submission);
        expect(exported.useIsRevisit()).toBe(true);
      });
    });
  });
  test('forwarded hooks', () => {
    expect(exported.actions).toEqual(actions);
    expect(exported.app).toEqual(app);
    expect(exported.assessment).toEqual(assessment);
    expect(exported.modalHooks).toEqual(modalHooks);
    expect(exported.routingHooks).toEqual(routingHooks);
    expect(exported.utils).toEqual(utils);
  });
});
