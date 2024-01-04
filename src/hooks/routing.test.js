import { useLocation } from 'react-router-dom';
import { when } from 'jest-when';

import { stepRoutes, routeSteps } from 'constants/index';

import * as hooks from './routing';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

const location = { pathname: `basePath/${stepRoutes.peer}` };
when(useLocation).calledWith().mockReturnValue(location);

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
});
