import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { usePrompts, useResponseData, useEffectiveGradeStep } from 'hooks/app';
import { stepNames } from 'constants/index';

import Content from './Content';

/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  usePrompts: jest.fn(),
  useResponseData: jest.fn(),
  useEffectiveGradeStep: jest.fn(),
}));

jest.mock('components/FileUpload', () => () => (
  <div data-testid="file-upload" />
));

jest.mock('components/Prompt', () => ({ prompt }) => (
  <div data-testid="prompt">{prompt}</div>
));

jest.mock('components/TextResponse', () => ({ response }) => (
  <div data-testid="text-response">{response}</div>
));

const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

describe('<Content />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without prompts when effectiveGradeStep is not peer', () => {
    usePrompts.mockReturnValue([]);
    useResponseData.mockReturnValue({ textResponses: [], uploadedFiles: [] });
    useEffectiveGradeStep.mockReturnValue(stepNames.self);

    renderWithIntl(<Content />);

    expect(screen.queryByTestId('prompt')).not.toBeInTheDocument();
    expect(screen.queryByTestId('text-response')).not.toBeInTheDocument();
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
    expect(screen.queryByText(/peer/i)).not.toBeInTheDocument();
  });

  it('renders prompts and responses when effectiveGradeStep is peer', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useResponseData.mockReturnValue({
      textResponses: ['text response 1', 'text response 2'],
      uploadedFiles: ['upload'],
    });
    useEffectiveGradeStep.mockReturnValue(stepNames.peer);

    renderWithIntl(<Content />);

    const prompts = screen.getAllByTestId('prompt');
    expect(prompts).toHaveLength(2);
    expect(prompts[0]).toHaveTextContent('prompt1');
    expect(prompts[1]).toHaveTextContent('prompt2');

    const responses = screen.getAllByTestId('text-response');
    expect(responses).toHaveLength(2);
    expect(responses[0]).toHaveTextContent('text response 1');
    expect(responses[1]).toHaveTextContent('text response 2');

    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
    expect(screen.getByText(/peer/i)).toBeInTheDocument();
  });
});
