import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CriterionContainer from './index';

/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('components/InfoPopover', () => ({ children }) => (
  <div data-testid="info-popover">{children}</div>
));

describe('<CriterionContainer />', () => {
  const props = {
    input: <div data-testid="input">input</div>,
    feedback: <div data-testid="feedback">feedback</div>,
    criterion: {
      name: 'criterionName',
      description: 'description',
      options: [
        {
          name: 'option1',
          label: 'Option 1',
          description: 'description1',
        },
        {
          name: 'option2',
          label: 'Option 2',
          description: 'description2',
        },
      ],
    },
  };

  it('renders with input and feedback', () => {
    render(<CriterionContainer {...props} />);

    expect(screen.getByText('criterionName')).toBeInTheDocument();

    expect(screen.getByTestId('info-popover')).toHaveTextContent('description');

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('description1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('description2')).toBeInTheDocument();

    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByText('input')).toBeInTheDocument();
    expect(screen.getByTestId('feedback')).toBeInTheDocument();
    expect(screen.getByText('feedback')).toBeInTheDocument();
  });

  it('renders without input and feedback', () => {
    render(<CriterionContainer criterion={props.criterion} />);

    expect(screen.getByText('criterionName')).toBeInTheDocument();

    expect(screen.getByTestId('info-popover')).toHaveTextContent('description');
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    expect(screen.queryByTestId('input')).not.toBeInTheDocument();
    expect(screen.queryByTestId('feedback')).not.toBeInTheDocument();
  });
});
