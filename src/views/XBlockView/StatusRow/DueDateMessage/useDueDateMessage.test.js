import {
  useActiveStepConfig,
  useGlobalState,
} from 'hooks/app';
import { stepNames, stepStates } from 'constants/index';

import useDueDateMessage, { dispDate } from './useDueDateMessage';

import messages from './messages';

jest.mock('hooks/app', () => ({
  useActiveStepConfig: jest.fn(),
  useGlobalState: jest.fn(),
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage: fn } = jest.requireActual('../../../../testUtils.jsx');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage: fn,
    }),
  };
});

describe('useDueDateMessage', () => {
  const mockActiveStepConfig = {
    startDatetime: '2021-01-01T00:00:00Z',
    endDatetime: '2021-01-01T00:00:00Z',
  };
  const expectedStartDatetime = dispDate(mockActiveStepConfig.startDatetime);
  const expectedEndDatetime = dispDate(mockActiveStepConfig.endDatetime);

  useActiveStepConfig.mockReturnValue(mockActiveStepConfig);
  [stepNames.done, stepNames.studentTraining, stepNames.staff].forEach((stepName) => {
    it(`should return null when stepName is ${stepName}`, () => {
      useGlobalState.mockReturnValueOnce({ activeStepName: stepName });
      const output = useDueDateMessage();
      expect(output).toBeNull();
    });
  });

  [stepStates.cancelled, stepStates.needTeam, stepStates.teamAlreadySubmitted].forEach((stepState) => {
    it(`should return null when stepState is ${stepState}`, () => {
      useGlobalState.mockReturnValueOnce({ stepState });
      const output = useDueDateMessage();
      expect(output).toBeNull();
    });
  });

  it('should return availableStartingOn message when stepState is notAvailable', () => {
    useGlobalState.mockReturnValueOnce({ stepState: stepStates.notAvailable });
    const output = useDueDateMessage();
    expect(output).toContain(expectedStartDatetime);
  });

  it('should return pastDue message when stepState is closed', () => {
    useGlobalState.mockReturnValueOnce({ activeStepName: stepNames.submission, stepState: stepStates.closed });
    const output = useDueDateMessage();
    expect(output).toContain(expectedEndDatetime);
  });

  it('should return waitingForPeerGrades message when stepState is waitingForPeerGrades', () => {
    useGlobalState.mockReturnValueOnce({ stepState: stepStates.waitingForPeerGrades });
    const output = useDueDateMessage();
    expect(output).toEqual(messages.waitingForPeerGrades.defaultMessage);
  });

  [stepNames.submission, stepNames.self, stepNames.peer].forEach((stepName) => {
    it(`should return dueDate message when stepState is not ${stepStates.closed} or ${stepStates.waitingForPeerGrades}`, () => {
      useGlobalState.mockReturnValueOnce({ activeStepName: stepName });
      const output = useDueDateMessage();
      expect(output).toContain(expectedEndDatetime);
    });
  });
});
