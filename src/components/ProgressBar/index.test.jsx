import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import {
  useAssessmentStepOrder,
  useGlobalState,
  useHasReceivedFinalGrade,
  useIsPageDataLoaded,
} from 'hooks/app';
import { stepNames } from 'constants/index';
import { useViewStep } from 'hooks/routing';
import { isXblockStep } from 'utils';

import ProgressBar from './index';

/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

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
  <div data-testid="progress-step" data-step={step} />
));

const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

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

    const steps = screen.getAllByTestId('progress-step');
    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveAttribute('data-step', stepNames.submission);
    expect(steps[1]).toHaveAttribute('data-step', stepNames.studentTraining);
    expect(steps[2]).toHaveAttribute('data-step', stepNames.self);
    expect(steps[3]).toHaveAttribute('data-step', stepNames.peer);
    expect(steps[4]).toHaveAttribute('data-step', stepNames.done);
  });
});
