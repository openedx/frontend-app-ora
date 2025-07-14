import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { usePrompts, useSubmissionConfig } from 'hooks/app';

import SubmissionPrompts from './SubmissionPrompts';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  usePrompts: jest.fn(),
  useSubmissionConfig: jest.fn(),
}));

/* eslint-disable react/prop-types */
jest.mock('components/Prompt', () => ({ prompt }) => (
  <div>Prompt: {prompt}</div>
));

jest.mock('components/TextResponse', () => ({ response }) => (
  <div>Response: {response}</div>
));

jest.mock('./TextResponseEditor', () => ({ value, onChange, isInValid }) => (
  <textarea
    data-testid="text-response-editor"
    value={value || ''}
    onChange={(e) => onChange && onChange(e.target.value)}
    aria-invalid={isInValid}
  />
));

const renderWithIntl = (ui) => render(
  <IntlProvider locale="en" messages={{}}>
    {ui}
  </IntlProvider>,
);

describe('<SubmissionPrompts />', () => {
  const mockOnUpdateTextResponse = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnUpdateTextResponse.mockImplementation(() => () => {});
  });

  it('renders text response editor when readOnly is false', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { enabled: true },
    });

    renderWithIntl(
      <SubmissionPrompts
        textResponses={['response1', 'response2']}
        onUpdateTextResponse={mockOnUpdateTextResponse}
        isReadOnly={false}
      />,
    );

    expect(screen.getByText('Prompt: prompt1')).toBeInTheDocument();
    expect(screen.getByText('Prompt: prompt2')).toBeInTheDocument();
    expect(screen.getAllByTestId('text-response-editor')).toHaveLength(2);
    expect(screen.queryByText(/^Response:/)).not.toBeInTheDocument();
  });

  it('renders text response when readOnly is true', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { enabled: true },
    });

    renderWithIntl(
      <SubmissionPrompts
        textResponses={['response1', 'response2']}
        onUpdateTextResponse={mockOnUpdateTextResponse}
        isReadOnly
      />,
    );

    expect(screen.getByText('Prompt: prompt1')).toBeInTheDocument();
    expect(screen.getByText('Prompt: prompt2')).toBeInTheDocument();
    expect(screen.getByText('Response: response1')).toBeInTheDocument();
    expect(screen.getByText('Response: response2')).toBeInTheDocument();
    expect(
      screen.queryByTestId('text-response-editor'),
    ).not.toBeInTheDocument();
  });

  it('renders empty prompts', () => {
    usePrompts.mockReturnValue([]);
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { enabled: true },
    });

    renderWithIntl(
      <SubmissionPrompts
        textResponses={['response1', 'response2']}
        onUpdateTextResponse={mockOnUpdateTextResponse}
        isReadOnly
      />,
    );

    expect(screen.queryByText(/^Prompt:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Response:/)).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('text-response-editor'),
    ).not.toBeInTheDocument();
  });

  it('does not render response when textResponseConfig is disabled', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { enabled: false },
    });

    renderWithIntl(
      <SubmissionPrompts
        textResponses={['response1', 'response2']}
        onUpdateTextResponse={mockOnUpdateTextResponse}
        isReadOnly
      />,
    );

    expect(screen.getByText('Prompt: prompt1')).toBeInTheDocument();
    expect(screen.getByText('Prompt: prompt2')).toBeInTheDocument();
    expect(screen.queryByText(/^Response:/)).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('text-response-editor'),
    ).not.toBeInTheDocument();
  });
});
