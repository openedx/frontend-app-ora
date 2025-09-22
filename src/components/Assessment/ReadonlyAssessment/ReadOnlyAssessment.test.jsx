import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ReadOnlyAssessment from './ReadOnlyAssessment';
 
import { renderWithProviders } from 'testUtils';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

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

const mockReadOnlyMultipleAssessmentsProps = {
  assessments:[
    {
      criteria: [
        {
          selectedOption: 0,
          feedback: 'a1 - Mock feedback 1',
        },
        {
          selectedOption: 1,
          feedback: 'a1 - Mock feedback 2',
        },
      ],
      overallFeedback: 'Overall, Assessment 1 feedback!',
    },
    {
      criteria: [
        {
          selectedOption: 2,
          feedback: 'a2 - Mock feedback 1',
        },
        {
          selectedOption: 3,
          feedback: 'a2 - Mock feedback 2',
        },
      ],
      overallFeedback: 'Overall, Assessment 2 feedback!',
    },
  ],
  stepLabel: 'Mock Step Label Multiple 2',
  step: 'mock step multiple 2',
  stepScore: {
    earned: 20,
    possible: 80,
  },
  defaultOpen: true,
};


describe('<ReadOnlyAssessment />', () => {

  it('renders with props and displays feedback with single assessment', () => {
    renderWithProviders(<ReadOnlyAssessment {...mockReadOnlyAssessmentProps} />);
    expect(screen.getByRole('heading', { name: "Mock Step Label 1 grade:2 / 100" })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: "Mock Step Label 1 comments comment" })).toHaveLength(2);
    expect(screen.getAllByRole('heading', { name: "Overall feedback" })).toHaveLength(1);

  });

  it('renders with multiple assessments', () => {
    renderWithProviders(<ReadOnlyAssessment {...mockReadOnlyMultipleAssessmentsProps} />);
    expect(screen.getAllByRole('heading', { name: "Overall feedback" })).toHaveLength(2);
  });

});
