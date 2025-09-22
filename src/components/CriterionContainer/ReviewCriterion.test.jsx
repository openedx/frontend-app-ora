import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from 'testUtils';
import messages from './messages';

import ReviewCriterion from './ReviewCriterion';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

describe('<ReviewCriterion />', () => {
  const criterion = {
    options: [
      {
        name: 'option1',
        label: 'Option 1',
        points: 1,
      },
      {
        name: 'option2',
        label: 'Option 2',
        points: 2,
      },
    ],
  };

  it('renders options with labels and points', () => {
    renderWithIntl(<ReviewCriterion criterion={criterion} messages={messages} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('1 points')).toBeInTheDocument();
    expect(screen.getByText('2 points')).toBeInTheDocument();
  });

  it('renders with no options', () => {
    renderWithIntl(<ReviewCriterion criterion={{ options: [] }} messages={messages} />);

    expect(screen.queryByText(/points/)).not.toBeInTheDocument();
  });
});
