import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useHasSubmitted, useRefreshPageData } from 'hooks/app';
import { useSubmittedAssessment } from 'hooks/assessment';
import ReadOnlyAssessmentContainer from '.';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

const mockRefreshPageData = jest.fn();

jest.mock('hooks/app', () => ({
  useHasSubmitted: jest.fn(),
  useRefreshPageData: jest.fn(() => mockRefreshPageData),
}));
jest.mock('hooks/assessment', () => ({
  useSubmittedAssessment: jest.fn(),
}));

/* eslint-disable react/prop-types */
jest.mock(
  './ReadOnlyAssessment',
  () => ({
    assessment, step, stepScore, stepLabel, defaultOpen, ...rest
  }) => (
    <div>
      <h2>ReadOnly Assessment</h2>
      {assessment && <div data-assessment="true">Assessment Data</div>}
      {step && <div data-step="true">Step: {step}</div>}
      {stepScore && (
      <div data-stepscore="true">
        Score: {stepScore.earned}/{stepScore.total}
      </div>
      )}
      {stepLabel && <div data-steplabel="true">Label: {stepLabel}</div>}
      {defaultOpen !== undefined && (
      <div data-defaultopen="true">
        Default Open: {defaultOpen.toString()}
      </div>
      )}
      <div aria-label="Props Data">
        {JSON.stringify({
          assessment,
          step,
          stepScore,
          stepLabel,
          defaultOpen,
          ...rest,
        })}
      </div>
    </div>
  ),
);

describe('<ReadOnlyAssessmentContainer />', () => {
  beforeEach(() => {
    useHasSubmitted.mockReturnValue(false);
    useRefreshPageData.mockReturnValue(mockRefreshPageData);
    useSubmittedAssessment.mockReturnValue(null);
    mockRefreshPageData.mockClear();
  });

  const props = {
    assessment: {
      abc: 'def',
    },
    assessments: [
      {
        abc: 'def',
      },
      {
        ghi: 'jkl',
      },
    ],
    step: 'Step',
    stepScore: {
      earned: 5,
      total: 10,
    },
    stepLabel: 'Test Label',
    defaultOpen: true,
  };

  it('renders the component with props', () => {
    render(<ReadOnlyAssessmentContainer {...props} />);

    expect(
      screen.getByRole('heading', { name: 'ReadOnly Assessment' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Assessment Data')).toBeInTheDocument();
    expect(screen.getByText('Step: Step')).toBeInTheDocument();
    expect(screen.getByText('Score: 5/10')).toBeInTheDocument();
    expect(screen.getByText('Label: Test Label')).toBeInTheDocument();
    expect(screen.getByText('Default Open: true')).toBeInTheDocument();
  });

  it('renders without props', () => {
    render(<ReadOnlyAssessmentContainer />);

    expect(
      screen.getByRole('heading', { name: 'ReadOnly Assessment' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Assessment Data')).not.toBeInTheDocument();
    expect(screen.queryByText(/Step:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Score:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Label:/)).not.toBeInTheDocument();
  });

  it('passes submitted assessment when user has submitted', () => {
    const submittedAssessment = { submitted: 'data' };
    useHasSubmitted.mockReturnValue(true);
    useSubmittedAssessment.mockReturnValue(submittedAssessment);

    render(<ReadOnlyAssessmentContainer {...props} />);

    expect(screen.getByLabelText('Props Data')).toHaveTextContent(
      '"submitted":"data"',
    );
  });

  it('calls refreshPageData when hasSubmitted is true', () => {
    useHasSubmitted.mockReturnValue(true);

    render(<ReadOnlyAssessmentContainer {...props} />);

    expect(mockRefreshPageData).toHaveBeenCalled();
  });

  it('does not call refreshPageData when hasSubmitted is false', () => {
    useHasSubmitted.mockReturnValue(false);

    render(<ReadOnlyAssessmentContainer {...props} />);

    expect(mockRefreshPageData).not.toHaveBeenCalled();
  });
});
