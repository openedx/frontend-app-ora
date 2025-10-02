import { useParams } from 'react-router-dom';
import { when } from 'jest-when';
import { Rule } from '@openedx/paragon/icons';

import { stepNames, stepRoutes } from 'constants/index';
import { useActiveStepName } from 'hooks/app';
import messages from './messages';
import useStartStepAction from './useStartStepAction';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
jest.mock('hooks/app', () => ({ useActiveStepName: jest.fn() }));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage: fn } = jest.requireActual('../../testUtils.jsx');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage: fn,
    }),
  };
});

const courseId = 'test-course-id';
const xblockId = 'test-xblock-id';
when(useParams).calledWith().mockReturnValue({ courseId, xblockId });
when(useActiveStepName).calledWith().mockReturnValue(stepNames.peer);

describe('useStartStepAction', () => {
  describe('behavior', () => {
    it('loads params and active step from hooks', () => {
      useStartStepAction();
      expect(useParams).toHaveBeenCalledWith();
      expect(useActiveStepName).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    it('returns null for submission and staff steps', () => {
      when(useActiveStepName).calledWith().mockReturnValueOnce(stepNames.submission);
      expect(useStartStepAction()).toBeNull();
      when(useActiveStepName).calledWith().mockReturnValueOnce(stepNames.staff);
      expect(useStartStepAction()).toBeNull();
    });
    it('returns Rule icon action for done step', () => {
      when(useActiveStepName).calledWith().mockReturnValueOnce(stepNames.done);
      const { children, href, iconBefore } = useStartStepAction().action;
      expect(children).toEqual(messages.viewGrades.defaultMessage);
      expect(href).toEqual(`/${stepRoutes.done}/${courseId}/${xblockId}`);
      expect(iconBefore).toEqual(Rule);
    });
    describe('simple actions for other steps', () => {
      const testStep = (step, message) => {
        test(step, () => {
          when(useActiveStepName).calledWith().mockReturnValueOnce(step);
          const { children, href, iconBefore } = useStartStepAction().action;
          expect(children).toEqual(message.defaultMessage);
          expect(href).toEqual(`/${stepRoutes[step]}/${courseId}/${xblockId}`);
          expect(iconBefore).toBeUndefined();
        });
      };
      testStep(stepNames.self, messages.startSelf);
      testStep(stepNames.studentTraining, messages.startTraining);
      testStep(stepNames.peer, messages.startPeer);
    });
  });
});
