import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useCriteriaConfig } from 'hooks/assessment';
import AssessmentCriteria from './AssessmentCriteria';
import { renderWithIntl } from '../../../testUtils';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/assessment', () => ({
  useCriteriaConfig: jest.fn(),
}));



describe('<AssessmentCriteria />', () => {
  const mockCriteriaConfig = [
    {
      name: 'Criterion Name',
      description: 'Criterion Description',
      options: {
        1: {
          label: 'Selected Option 1',
          points: 5,
        },
      },
    },
    {
      name: 'Criterion Name 2',
      description: 'Criterion Description 2',
      options: {
        2: {
          label: 'Selected Option 2',
          points: 10,
        },
      },
    },
  ];

  const props = {
    criteria: [
      {
        selectedOption: 1,
        feedback: 'Feedback 1',
      },
      {
        selectedOption: 2,
        feedback: 'Feedback 2',
      },
    ],
    overallFeedback: 'Overall Feedback',
    stepLabel: 'Step Label',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders criteria feedback components with correct data', () => {
    useCriteriaConfig.mockReturnValue(mockCriteriaConfig);

    renderWithIntl(<AssessmentCriteria {...props} />);

    expect(screen.getByRole('heading', { name: 'Criterion Name' })).toBeTruthy();
    expect(screen.getByText('Selected Option 1: 5 Points')).toBeTruthy();
    expect(screen.getByText('Feedback 1')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Criterion Name 2' }),
    ).toBeTruthy();
    expect(screen.getByText('Selected Option 2: 10 Points')).toBeTruthy();
    expect(screen.getByText('Feedback 2')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Overall feedback' }),
    ).toBeTruthy();
    expect(screen.getByText('Overall Feedback')).toBeInTheDocument();
  });

  it('renders without overall feedback when not provided', () => {
    useCriteriaConfig.mockReturnValue(mockCriteriaConfig);

    const propsWithoutOverallFeedback = {
      ...props,
      overallFeedback: null,
    };

    renderWithIntl(<AssessmentCriteria {...propsWithoutOverallFeedback} />);

    expect(
      screen.queryByRole('heading', { name: 'Overall feedback' }),
    ).toBeNull();
  });

  it('renders empty when no criteria config is provided', () => {
    useCriteriaConfig.mockReturnValue([]);

    renderWithIntl(<AssessmentCriteria criteria={[]} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('handles missing selected options gracefully', () => {
    const configWithMissingOptions = [
      {
        name: 'Criterion With Missing Option',
        description: 'Description',
        options: {},
      },
    ];

    useCriteriaConfig.mockReturnValue(configWithMissingOptions);

    const propsWithMissingOption = {
      criteria: [
        {
          selectedOption: 999,
          feedback: 'Some feedback',
        },
      ],
    };

    renderWithIntl(<AssessmentCriteria {...propsWithMissingOption} />);

    expect(
      screen.getByRole('heading', { name: 'Criterion With Missing Option' }),
    ).toBeTruthy();

    expect(screen.getByText('Some feedback')).toBeInTheDocument();

    expect(screen.queryByText(/Points/)).toBeNull();
  });

  it('passes correct step label to comment headers', () => {
    useCriteriaConfig.mockReturnValue([mockCriteriaConfig[0]]);

    const propsWithStepLabel = {
      criteria: [
        {
          selectedOption: 1,
          feedback: 'Test feedback',
        },
      ],
      stepLabel: 'Self Assessment',
    };

    renderWithIntl(<AssessmentCriteria {...propsWithStepLabel} />);
    expect(screen.getByText('Self Assessment comments comment')).toBeInTheDocument();
  });
});
