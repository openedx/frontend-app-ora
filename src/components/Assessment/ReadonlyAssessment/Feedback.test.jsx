import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from '../../../testUtils';

import Feedback from './Feedback';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('components/InfoPopover', () => {
  // eslint-disable-next-line react/prop-types
  const MockInfoPopover = ({ children }) => <div>{children}</div>;
  return MockInfoPopover;
});

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
    ).toBeInTheDocument();
    expect(screen.getByText(/Selected Option.*5.*Points/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Comment Header comment/ }),
    ).toBeInTheDocument();
    expect(screen.getByText('Comment Body')).toBeInTheDocument();
  });

  it('renders with minimal required props', () => {
    renderWithIntl(
      <Feedback criterionName="Test Criterion" commentBody="Test Comment" />,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Criterion' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Points/)).toBeNull();
    expect(screen.getByRole('button', { name: /Comments/ })).toBeInTheDocument();
    expect(screen.getByText('Test Comment')).toBeInTheDocument();
  });

  it('renders without selectedOption', () => {
    const propsWithoutOption = { ...props, selectedOption: null };
    renderWithIntl(<Feedback {...propsWithoutOption} />);

    expect(
      screen.getByRole('heading', { name: 'Criterion Name' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Selected Option/)).toBeNull();
    expect(screen.queryByText(/Points/)).toBeNull();
  });

  it('renders without criterionDescription', () => {
    const propsWithoutDescription = { ...props, criterionDescription: null };
    renderWithIntl(<Feedback {...propsWithoutDescription} />);

    expect(
      screen.getByRole('heading', { name: 'Criterion Name' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Selected Option.*5.*Points/)).toBeInTheDocument();
  });

  it('renders without commentBody', () => {
    const propsWithoutComment = { ...props, commentBody: '' };
    renderWithIntl(<Feedback {...propsWithoutComment} />);

    expect(
      screen.getByRole('heading', { name: 'Criterion Name' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Selected Option.*5.*Points/)).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByText('Comment Body')).toBeNull();
  });
});
