import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import CollapsibleAssessment from './CollapsibleAssessment';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

const messages = {
  'frontend-app-ora.grade': '{stepLabel} grade:',
  'ora-collapsible-comment.unweightedGrade': '{stepLabel} grade',
  'frontend-app-ora.gradePoints': '{earned} / {possible}',
  'ora-collapsible-comment.submittedAssessment': 'Submitted assessment',
};

const renderWithIntl = (component) => render(
  <IntlProvider locale="en" messages={messages}>
    {component}
  </IntlProvider>,
);

describe('<CollapsibleAssessment />', () => {
  const defaultProps = {
    stepScore: {
      earned: 5,
      possible: 10,
    },
    stepLabel: 'Step Label',
    defaultOpen: true,
  };

  it('renders with step label and score', () => {
    renderWithIntl(
      <CollapsibleAssessment {...defaultProps}>
        <div>Children</div>
      </CollapsibleAssessment>,
    );

    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Step Label grade/ })).toBeTruthy();
    expect(screen.getByText(/5.*\/.*10/)).toBeTruthy();
    expect(screen.getByText('Children')).toBeTruthy();
  });

  it('renders with minimal props', () => {
    renderWithIntl(
      <CollapsibleAssessment>
        <div>Children</div>
      </CollapsibleAssessment>,
    );

    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Submitted assessment' })).toBeTruthy();
    expect(screen.queryByText('Children')).toBeNull();
  });

  it('renders with step label but no score', () => {
    const propsWithoutScore = {
      stepLabel: 'Peer Assessment',
      defaultOpen: true,
    };

    renderWithIntl(
      <CollapsibleAssessment {...propsWithoutScore}>
        <div>Test content</div>
      </CollapsibleAssessment>,
    );

    expect(screen.getByRole('heading', { name: 'Peer Assessment grade' })).toBeTruthy();
    expect(screen.queryByText(/\d+ \/ \d+/)).toBeNull();
    expect(screen.getByText('Test content')).toBeTruthy();
  });
});
