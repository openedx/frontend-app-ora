import { useLocation } from 'react-router-dom';
import { when } from 'jest-when';

import { stepNames, stepRoutes, routeSteps } from 'constants/index';
import { useActiveStepName } from 'data/services/lms/hooks/selectors';

import * as exported from './routing';

const { hooks } = exported;

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));
jest.mock('data/services/lms/hooks/selectors', () => ({
  useActiveStepName: jest.fn(),
}));
useActiveStepName.mockReturnValue(stepNames.peer);

const location = stepName => ({ pathname: `basePath/${stepRoutes[stepName]}` });
when(useLocation).calledWith().mockReturnValue(location(stepNames.peer));

describe('routing hooks', () => {
  describe('useActiveView', () => {
    it('returns the active step view route', () => {
      expect(hooks.useActiveView()).toEqual(stepRoutes.peer);
    });
  });
  describe('useViewStep', () => {
    it('returns the active view based on view route', () => {
      expect(hooks.useViewStep()).toEqual(routeSteps[stepRoutes.peer]);
    });
  });
  describe('useEffectiveStep', () => {
    let viewStepSpy;
    it('returns viewStep if viewStep is not xblock', () => {
      viewStepSpy = jest.spyOn(hooks, 'useViewStep');
      when(viewStepSpy).calledWith().mockReturnValueOnce('other');
      expect(hooks.useEffectiveStep()).toEqual('other');
    });
    it('returns activeStep if viewStep is xblock', () => {
      viewStepSpy = jest.spyOn(hooks, 'useViewStep');
      when(viewStepSpy).calledWith().mockReturnValueOnce(stepNames.xblock);
      expect(hooks.useEffectiveStep()).toEqual(stepNames.peer);
    });
  });
});
