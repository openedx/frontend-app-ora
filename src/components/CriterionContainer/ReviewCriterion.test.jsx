import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ReviewCriterion from './ReviewCriterion';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

const mockMessages = {
  'frontend-app-ora.RadioCriterion.optionPoints': '{points} points',
};

const withIntl = (component) => (
  <IntlProvider locale="en" messages={mockMessages}>
    {component}
  </IntlProvider>
);

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
    render(withIntl(<ReviewCriterion criterion={criterion} />));

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('1 points')).toBeInTheDocument();
    expect(screen.getByText('2 points')).toBeInTheDocument();
  });

  it('renders with no options', () => {
    render(withIntl(<ReviewCriterion criterion={{ options: [] }} />));

    expect(screen.queryByText(/points/)).not.toBeInTheDocument();
  });
});
