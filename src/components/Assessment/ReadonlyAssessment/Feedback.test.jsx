import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import Feedback from './Feedback';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('components/InfoPopover', () => {
  // eslint-disable-next-line react/prop-types
  const MockInfoPopover = ({ children }) => <div>{children}</div>;
  return MockInfoPopover;
});

const messages = {
  'frontend-app-ora.readMore': 'Read more',
  'frontend-app-ora.readLess': 'Read less',
  'ora-collapsible-comment.comment': 'Comments',
  'ora-collapsible-comment.stepComment': '{step} comment',
  'ora-collapsible-comment.points': 'Points',
};

const renderWithIntl = (component) => render(
  <IntlProvider locale="en" messages={messages}>
    {component}
  </IntlProvider>,
);

describe('<Feedback />', () => {
  const props = {
    criterionDescription: 'Criterion Description',
    selectedOption: 'Selected Option',
    selectedPoints: 5,
    commentHeader: 'Comment Header',
    criterionName: 'Criterion Name',
    commentBody: 'Comment Body',
  };

  it('renders with all props', () => {
    renderWithIntl(<Feedback {...props} />);

    expect(
      screen.getByRole('heading', { name: 'Criterion Name' }),
    ).toBeTruthy();
    expect(screen.getByText(/Selected Option.*5.*Points/)).toBeTruthy();
    expect(
      screen.getByRole('button', { name: /Comment Header comment/ }),
    ).toBeTruthy();
    expect(screen.getByText('Comment Body')).toBeTruthy();
  });

  it('renders with minimal required props', () => {
    renderWithIntl(
      <Feedback criterionName="Test Criterion" commentBody="Test Comment" />,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Criterion' }),
    ).toBeTruthy();
    expect(screen.queryByTestId('info-popover')).toBeNull();
    expect(screen.queryByText(/Points/)).toBeNull();
    expect(screen.getByRole('button', { name: /Comments/ })).toBeTruthy();
    expect(screen.getByText('Test Comment')).toBeTruthy();
  });

  it('renders without selectedOption', () => {
    const propsWithoutOption = { ...props, selectedOption: null };
    renderWithIntl(<Feedback {...propsWithoutOption} />);

    expect(
      screen.getByRole('heading', { name: 'Criterion Name' }),
    ).toBeTruthy();
    expect(screen.queryByText(/Selected Option/)).toBeNull();
    expect(screen.queryByText(/Points/)).toBeNull();
  });

  it('renders without criterionDescription', () => {
    const propsWithoutDescription = { ...props, criterionDescription: null };
    renderWithIntl(<Feedback {...propsWithoutDescription} />);

    expect(
      screen.getByRole('heading', { name: 'Criterion Name' }),
    ).toBeTruthy();
    expect(screen.queryByTestId('info-popover')).toBeNull();
    expect(screen.getByText(/Selected Option.*5.*Points/)).toBeTruthy();
  });

  it('renders without commentBody', () => {
    const propsWithoutComment = { ...props, commentBody: '' };
    renderWithIntl(<Feedback {...propsWithoutComment} />);

    expect(
      screen.getByRole('heading', { name: 'Criterion Name' }),
    ).toBeTruthy();
    expect(screen.getByText(/Selected Option.*5.*Points/)).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByText('Comment Body')).toBeNull();
  });
});
