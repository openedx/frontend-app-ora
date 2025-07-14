import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ReadOnlyAssessment from './ReadOnlyAssessment';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

/* eslint-disable react/prop-types */
jest.mock(
  './CollapsibleAssessment',
  () => ({
    children, stepLabel, stepScore, defaultOpen,
  }) => (
    <section aria-label="Collapsible Assessment">
      <div aria-label="Assessment Properties">
        stepLabel: {stepLabel || 'none'}, stepScore:{' '}
        {stepScore ? `${stepScore.earned}/${stepScore.total}` : 'none'},
        defaultOpen: {defaultOpen?.toString() || 'false'}
      </div>
      {children}
    </section>
  ),
);

jest.mock('./AssessmentCriteria', () => ({ stepLabel, ...props }) => (
  <article aria-label={`Assessment Criteria for ${stepLabel || 'unknown'}`}>
    AssessmentCriteria - stepLabel: {stepLabel || 'none'}
    <div aria-label="Criteria Properties">{JSON.stringify(props)}</div>
  </article>
));

describe('<ReadOnlyAssessment />', () => {
  const props = {
    assessment: {
      abc: 'def',
    },
    step: 'Step',
    stepScore: {
      earned: 5,
      total: 10,
    },
    stepLabel: 'Test Step',
    defaultOpen: false,
  };

  it('renders with single assessment', () => {
    render(<ReadOnlyAssessment {...props} />);

    expect(screen.getByLabelText('Collapsible Assessment')).toBeInTheDocument();

    const assessmentProps = screen.getByLabelText('Assessment Properties');
    expect(assessmentProps).toHaveTextContent('stepLabel: Test Step');
    expect(assessmentProps).toHaveTextContent('stepScore: 5/10');
    expect(assessmentProps).toHaveTextContent('defaultOpen: false');

    const assessmentCriteria = screen.getAllByLabelText(
      /Assessment Criteria for/,
    );
    expect(assessmentCriteria).toHaveLength(1);
    expect(assessmentCriteria[0]).toHaveTextContent(
      'AssessmentCriteria - stepLabel: Test Step',
    );

    const criteriaProps = screen.getByLabelText('Criteria Properties');
    expect(criteriaProps).toHaveTextContent('"abc":"def"');
  });

  it('renders with multiple assessments', () => {
    const assessments = [
      {
        abc: 'def',
      },
      {
        ghi: 'jkl',
      },
    ];
    render(<ReadOnlyAssessment {...props} assessments={assessments} />);

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
    render(<ReadOnlyAssessment />);

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
