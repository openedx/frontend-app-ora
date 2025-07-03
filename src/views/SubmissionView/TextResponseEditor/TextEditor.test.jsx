import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import userEvent from '@testing-library/user-event';

import TextEditor from './TextEditor';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

describe('<TextEditor />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  const defaultProps = {
    optional: true,
    disabled: false,
    value: 'value',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders text editor with textarea', () => {
    renderWithIntl(<TextEditor {...defaultProps} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('value')).toBeInTheDocument();
  });

  it('renders text editor with validation error', () => {
    renderWithIntl(<TextEditor {...defaultProps} optional={false} isInValid />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('calls onChange when text is entered', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    renderWithIntl(
      <TextEditor {...defaultProps} onChange={mockOnChange} value="" />,
    );

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'new text');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    renderWithIntl(<TextEditor {...defaultProps} disabled />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('shows placeholder text', () => {
    renderWithIntl(<TextEditor {...defaultProps} value="" />);

    expect(
      screen.getByPlaceholderText('Enter your response to the prompt above'),
    ).toBeInTheDocument();
  });

  it('renders without validation error when valid', () => {
    renderWithIntl(
      <TextEditor {...defaultProps} optional={false} isInValid={false} />,
    );

    expect(
      screen.queryByText('This field is required'),
    ).not.toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    const { container } = renderWithIntl(<TextEditor {...defaultProps} />);

    const textarea = container.querySelector('.textarea-response');
    expect(textarea).toBeInTheDocument();
  });
});
