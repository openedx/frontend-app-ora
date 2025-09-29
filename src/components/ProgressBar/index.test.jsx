import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  useAssessmentStepOrder,
  useGlobalState,
  useHasReceivedFinalGrade,
  useIsPageDataLoaded,
} from 'hooks/app';
import { stepNames } from 'constants/index';
import { useViewStep } from 'hooks/routing';
import { isXblockStep } from 'utils';
import { renderWithIntl } from '../../testUtils';
import ProgressBar from './index';

/* eslint-disable react/prop-types */

jest.mock('hooks/app', () => ({
  useAssessmentStepOrder: jest.fn(),
  useGlobalState: jest.fn(),
  useHasReceivedFinalGrade: jest.fn(),
  useIsPageDataLoaded: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('utils', () => ({
  isXblockStep: jest.fn(),
}));

jest.mock('./ProgressStep', () => ({ step }) => (
  <div data-step={step}>Progress Step {step}</div>
));

describe('<ProgressBar />', () => {
  const props = {
    className: 'test-class',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders null when page data is not loaded', () => {
    useIsPageDataLoaded.mockReturnValue(false);
    useHasReceivedFinalGrade.mockReturnValue(false);
    useGlobalState.mockReturnValue({ activeStepName: stepNames.submission });
    useAssessmentStepOrder.mockReturnValue([]);
    useViewStep.mockReturnValue(stepNames.submission);
    isXblockStep.mockReturnValue(false);

    renderWithIntl(<ProgressBar {...props} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders all steps when xblock step with assessment order', () => {
    useIsPageDataLoaded.mockReturnValue(true);
    useHasReceivedFinalGrade.mockReturnValue(false);
    useGlobalState.mockReturnValue({ activeStepName: stepNames.submission });
    useAssessmentStepOrder.mockReturnValue([
      stepNames.studentTraining,
      stepNames.self,
      stepNames.peer,
    ]);
    useViewStep.mockReturnValue(stepNames.submission);
    isXblockStep.mockReturnValue(true);

    renderWithIntl(<ProgressBar {...props} />);

    expect(screen.getByText('Progress Step submission')).toBeInTheDocument();
    expect(
      screen.getByText('Progress Step studentTraining'),
    ).toBeInTheDocument();
    expect(screen.getByText('Progress Step self')).toBeInTheDocument();
    expect(screen.getByText('Progress Step peer')).toBeInTheDocument();
    expect(screen.getByText('Progress Step done')).toBeInTheDocument();
  });
});
