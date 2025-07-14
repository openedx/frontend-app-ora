import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import messages from './messages';
import RichTextEditor from './RichTextEditor';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

/* eslint-disable react/prop-types */
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

jest.mock('tinymce/tinymce.min', () => 'tinymce');
jest.mock('tinymce/icons/default', () => 'default');
jest.mock('tinymce/plugins/link', () => 'link');
jest.mock('tinymce/plugins/lists', () => 'lists');
jest.mock('tinymce/plugins/code', () => 'code');
jest.mock('tinymce/plugins/image', () => 'image');
jest.mock('tinymce/themes/silver', () => 'silver');

const renderWithIntl = (ui) => {
  const testMessages = {
    'frontend-app-ora.TextResponse.yourResponse':
      messages.yourResponse.defaultMessage,
    'frontend-app-ora.TextResponse.optional': messages.optional.defaultMessage,
    'frontend-app-ora.TextResponse.required': messages.required.defaultMessage,
    'frontend-app-ora.TextResponse.requiredField':
      messages.requiredField.defaultMessage,
  };

  return render(
    <IntlProvider locale="en" messages={testMessages}>
      {ui}
    </IntlProvider>,
  );
};

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
    renderWithIntl(<RichTextEditor {...props} />);

    expect(screen.getByText(/your response \(optional\)/i)).toBeInTheDocument();
    const editor = screen.getByLabelText('Rich text editor');
    expect(editor).toBeInTheDocument();
    expect(editor).not.toBeDisabled();
    expect(editor).not.toHaveAttribute('readOnly');
    expect(editor).toHaveValue('test value');
  });

  it('renders required editor', () => {
    renderWithIntl(<RichTextEditor {...props} optional={false} />);

    expect(screen.getByText(/your response \(required\)/i)).toBeInTheDocument();
    const editor = screen.getByLabelText('Rich text editor');
    expect(editor).toBeInTheDocument();
    expect(editor).not.toBeDisabled();
  });

  it('renders disabled editor', () => {
    renderWithIntl(<RichTextEditor {...props} disabled />);

    expect(screen.getByText(/your response \(optional\)/i)).toBeInTheDocument();
    const editor = screen.getByLabelText('Rich text editor');
    expect(editor).toBeInTheDocument();
    expect(editor).toBeDisabled();
    expect(editor).toHaveAttribute('readOnly');
  });

  it('shows validation error when invalid', () => {
    renderWithIntl(<RichTextEditor {...props} isInValid />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not show validation error when valid', () => {
    renderWithIntl(<RichTextEditor {...props} isInValid={false} />);

    expect(
      screen.queryByText('This field is required'),
    ).not.toBeInTheDocument();
  });
});
