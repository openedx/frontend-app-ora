import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ReadOnlyAssessment from './ReadOnlyAssessment';
 
import { renderWithProviders } from 'testUtils';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');


/*
assessment: 
{
      criteria: [
      {
        selectedOption: 0,
        feedback: 'Mock feedback 2',
      },
      {
        selectedOption: 1,
        feedback: 'Mock feedback 2 again',
      }
    ],
      overallFeedback: 'Mock overall feedback 2!',
    },
}
*/

// mock this   const criteriaConfig = useCriteriaConfig();

jest.mock('hooks/assessment', () => ({
  useCriteriaConfig: () => ([
    {
      name: 'criterion1',
      description: 'Criterion 1 description',
      options: [
        { label: 'Excellent', points: 3},
        { label: 'Good', points: 2 },
        { label: 'Fair', points: 1 },
      ],
    },
    {
      name: 'criterion2',
      description: 'Criterion 2 description',
      options: [
        { label: 'Yes', points: 1 },
        { label: 'No', points: 0 },
      ],
    },
  ]),
}));

const mockReadOnlyAssessmentProps = {
  assessment:{
    criteria: [
      {
        selectedOption: 0,
        feedback: 'Mock feedback 1',
      },
      {
        selectedOption: 1,
        feedback: 'Mock feedback 2',
      },
    ],
    overallFeedback: 'Overall, mock feedback!',
  },
  stepLabel: 'Mock Step Label 1',
  // Add any other required props for ReadOnlyAssessment here
  step: 'mock step 1',
  stepScore: {
    earned: 2,
    possible: 100,
  },
  defaultOpen: true,
};

describe('<ReadOnlyAssessment />', () => {

  it('renders with single assessment', () => {
    renderWithProviders(<ReadOnlyAssessment {...mockReadOnlyAssessmentProps} />);
     screen.debug();
    expect(screen.getByRole('heading', { name: "Mock Step Label 1 grade:2 / 100" })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: "Mock Step Label 1 comments comment" })).toHaveLength(2);

  });

  it('renders with multiple assessments', () => {
    const assessments = [
      {
        assessment1: 'assessment1',
      },
      {
        assessment2: 'assessment2',
      },
      {
        assessment3: 'assessment3',
      },
      {
        assessment4: 'assessment4',
      },
    ];
    renderWithIntl(<ReadOnlyAssessment assessments={assessments} {...props} />);
    screen.debug();
    expect(screen.getByLabelText('Collapsible Assessment')).toBeInTheDocument();

    const assessmentProps = screen.getByLabelText('Assessment Properties');
    expect(assessmentProps).toHaveTextContent('stepLabel: Test Step');
    expect(assessmentProps).toHaveTextContent('stepScore: 5/10');

    const assessmentCriteria = screen.getAllByLabelText(
      /Assessment Criteria for/,
    );
    expect(assessmentCriteria).toHaveLength(2);

    expect(screen.getByText('Test Step 1:')).toBeInTheDocument();
    expect(screen.getByText('Test Step 2:')).toBeInTheDocument();

    const criteriaProps = screen.getAllByLabelText('Criteria Properties');
    expect(criteriaProps[0]).toHaveTextContent('"abc":"def"');
    expect(criteriaProps[1]).toHaveTextContent('"ghi":"jkl"');
  });

  it('renders without props', () => {
    renderWithIntl(<ReadOnlyAssessment />);

    expect(screen.getByLabelText('Collapsible Assessment')).toBeInTheDocument();

    const assessmentProps = screen.getByLabelText('Assessment Properties');
    expect(assessmentProps).toHaveTextContent('stepLabel: none');
    expect(assessmentProps).toHaveTextContent('stepScore: none');
    expect(assessmentProps).toHaveTextContent('defaultOpen: false');

    const assessmentCriteria = screen.getAllByLabelText(
      /Assessment Criteria for/,
    );
    expect(assessmentCriteria).toHaveLength(1);
    expect(assessmentCriteria[0]).toHaveTextContent(
      'AssessmentCriteria - stepLabel: none',
    );
  });
});
