import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from 'testUtils';
import messages from './messages';
import RichTextEditor from './RichTextEditor';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

/* eslint-disable react/prop-types */
// Mock the TinyMCE editor
jest.mock('@tinymce/tinymce-react', () => ({
  Editor: ({
    init, disabled, onEditorChange, value,
  }) => (
    <textarea
      aria-label="Rich text editor"
      disabled={disabled}
      readOnly={init?.readonly === 1}
      onChange={(e) => onEditorChange && onEditorChange(e.target.value)}
      value={value}
    />
  ),
}));

describe('<RichTextEditor />', () => {
  const props = {
    optional: true,
    disabled: false,
    value: 'test value',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders optional editor', () => {
    renderWithIntl(<RichTextEditor {...props} />, messages);

    expect(screen.getByText(/your response \(optional\)/i)).toBeInTheDocument();
    const editor = screen.getByLabelText('Rich text editor');
    expect(editor).toBeInTheDocument();
    expect(editor).not.toBeDisabled();
    expect(editor).not.toHaveAttribute('readOnly');
    expect(editor).toHaveValue('test value');
  });

  it('renders required editor', () => {
    renderWithIntl(<RichTextEditor {...props} optional={false} />, messages);

    expect(screen.getByText(/your response \(required\)/i)).toBeInTheDocument();
    const editor = screen.getByLabelText('Rich text editor');
    expect(editor).toBeInTheDocument();
    expect(editor).not.toBeDisabled();
  });

  it('renders disabled editor', () => {
    renderWithIntl(<RichTextEditor {...props} disabled />, messages);

    expect(screen.getByText(/your response \(optional\)/i)).toBeInTheDocument();
    const editor = screen.getByLabelText('Rich text editor');
    expect(editor).toBeInTheDocument();
    expect(editor).toBeDisabled();
    expect(editor).toHaveAttribute('readOnly');
  });

  it('shows validation error when invalid', () => {
    renderWithIntl(<RichTextEditor {...props} isInValid />, messages);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not show validation error when valid', () => {
    renderWithIntl(<RichTextEditor {...props} isInValid={false} />, messages);

    expect(
      screen.queryByText('This field is required'),
    ).not.toBeInTheDocument();
  });
});
