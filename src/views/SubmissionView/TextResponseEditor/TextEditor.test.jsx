import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import TextEditor from './TextEditor';

describe('<TextEditor />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  const defaultProps = {
    optional: true,
    disabled: false,
    value: 'value',
    onChange: jest.fn(),
  };

  const defaultPropsOptionalFalseDisabledTrue = {
    optional: false,
    disabled: true,
    value: 'value',
    onChange: jest.fn(),
  };

  it('has correct CSS classes and accessibility attributes', () => {
    renderWithIntl(<TextEditor {...defaultProps} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'text-response');
    expect(textarea).toHaveAttribute(
      'placeholder',
      'Enter your response to the prompt above',
    );
    expect(textarea).toHaveValue('value');
    expect(textarea).not.toHaveAttribute('required');
  });

  it('has correct CSS classes and accessibility attributes with optional false and disabled true', () => {
    renderWithIntl(<TextEditor {...defaultPropsOptionalFalseDisabledTrue} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'text-response');
    expect(textarea).toHaveAttribute(
      'placeholder',
      'Enter your response to the prompt above',
    );
    expect(textarea).toHaveValue('value');
    expect(textarea).toHaveAttribute('required');
  });
});
