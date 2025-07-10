import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

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
  });
});
