import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useAssessmentData, useStepInfo } from 'hooks/app';
import { stepNames } from 'constants/index';
import { renderWithIntl } from '../../testUtils';
import FinalGrade from './FinalGrade';

/* eslint-disable react/prop-types */

jest.mock('hooks/app', () => ({
  useAssessmentData: jest.fn(),
  useStepInfo: jest.fn(),
}));

jest.mock('components/Assessment/ReadonlyAssessment', () => ({ step }) => (
  <div data-step={step}>Readonly Assessment {step}</div>
));

describe('<FinalGrade />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both self and peer assessments when both are available', () => {
    useAssessmentData.mockReturnValue({
      effectiveAssessmentType: stepNames.self,
      [stepNames.self]: {
        stepScore: 1,
      },
      [stepNames.peer]: {
        stepScore: 2,
      },
    });
    useStepInfo.mockReturnValue({
      [stepNames.self]: true,
      [stepNames.peer]: true,
    });

    renderWithIntl(<FinalGrade />);

    expect(screen.getByText('Readonly Assessment self')).toBeInTheDocument();
    expect(screen.getByText('Readonly Assessment peer')).toBeInTheDocument();
  });

  it('renders only peer assessment when self is not available', () => {
    useAssessmentData.mockReturnValue({
      effectiveAssessmentType: stepNames.peer,
      [stepNames.peer]: {
        stepScore: 2,
      },
    });
    useStepInfo.mockReturnValue({
      [stepNames.self]: false,
      [stepNames.peer]: true,
    });

    renderWithIntl(<FinalGrade />);

    expect(screen.getByText('Readonly Assessment peer')).toBeInTheDocument();
    expect(
      screen.queryByText('Readonly Assessment self'),
    ).not.toBeInTheDocument();
  });
});
