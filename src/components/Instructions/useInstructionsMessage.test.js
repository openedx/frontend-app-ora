import { useGlobalState } from 'hooks/app';
import { useViewStep } from 'hooks/routing';
import { isXblockStep } from 'utils';

import { stepNames, stepStates } from 'constants/index';

import useInstructionsMessage from './useInstructionsMessage';

import messages from './messages';

jest.mock('hooks/app', () => ({
  useGlobalState: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  isXblockStep: jest.fn(),
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage: fn } = jest.requireActual('../../testUtils.jsx');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage: fn,
    }),
  };
});

describe('useInstructionsMessage', () => {
  it('return null when stepState is not inProgress', () => {
    useGlobalState.mockReturnValueOnce({
      stepState: 'abitrarilyStepState',
      activeStepName: 'abitrarilyActiveStepName',
    });
    useViewStep.mockReturnValueOnce('abitrarilyViewStepName');
    isXblockStep.mockReturnValueOnce(true);

    expect(useInstructionsMessage()).toBe(null);
  });

  it('return null when stepName is staff', () => {
    useGlobalState.mockReturnValueOnce({
      stepState: stepStates.inProgress,
      activeStepName: stepNames.staff,
    });
    useViewStep.mockReturnValueOnce('abitrarilyViewStepName');
    isXblockStep.mockReturnValueOnce(true);

    expect(useInstructionsMessage()).toBe(null);
  });

  it('render value when step is not staff and in progress', () => {
    const step = stepNames.self;
    useGlobalState.mockReturnValueOnce({
      stepState: stepStates.inProgress,
      activeStepName: step,
    });
    useViewStep.mockReturnValueOnce(step);
    isXblockStep.mockReturnValueOnce(false);

    expect(useInstructionsMessage()).toBe(messages[step].defaultMessage);
  });

  it('render include effective grade when step is done', () => {
    const step = stepNames.done;
    const effectiveGrade = {
      earned: 1,
      possible: 2,
    };
    useGlobalState.mockReturnValueOnce({
      stepState: stepStates.inProgress,
      activeStepName: step,
      effectiveGrade,
    });
    useViewStep.mockReturnValueOnce(step);
    isXblockStep.mockReturnValueOnce(false);

    const out = useInstructionsMessage();

    expect(out).toContain(`${effectiveGrade.earned}/${effectiveGrade.possible}`);
  });
});
