import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithIntl } from '../../../testUtils';

import messages from './messages';

import CollapsibleAssessment from './CollapsibleAssessment';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

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
    renderWithIntl(<CollapsibleAssessment {...defaultProps}> <div>Children</div> </CollapsibleAssessment>, messages);

    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Step Label grade/ })).toBeTruthy();
    expect(screen.getByText(/5.*\/.*10/)).toBeTruthy();
    expect(screen.getByText('Children')).toBeTruthy();
  });

  it('renders with minimal props', () => {
    renderWithIntl(<CollapsibleAssessment> <div>Children</div> </CollapsibleAssessment>, messages);
    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Submitted assessment' })).toBeTruthy();
    expect(screen.queryByText('Children')).toBeNull();
  });

  it('renders with step label but no score', () => {
    const propsWithoutScore = {
      stepLabel: 'Peer Assessment',
      defaultOpen: true,
    };
    renderWithIntl(<CollapsibleAssessment {...propsWithoutScore}><div>Test content</div></CollapsibleAssessment>);
    expect(screen.getByRole('heading', { name: 'Peer Assessment grade' })).toBeTruthy();
    expect(screen.queryByText(/\d+ \/ \d+/)).toBeNull();
    expect(screen.getByText('Test content')).toBeTruthy();
  });
});
