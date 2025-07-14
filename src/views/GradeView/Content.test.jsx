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

jest.mock('components/FileUpload', () => () => <div>File Upload</div>);

jest.mock('components/Prompt', () => ({ prompt }) => (
  <div>Prompt: {prompt}</div>
));

jest.mock('components/TextResponse', () => ({ response }) => (
  <div>Text Response: {response}</div>
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

    expect(screen.queryByText(/^Prompt:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Text Response:/)).not.toBeInTheDocument();
    expect(screen.getByText('File Upload')).toBeInTheDocument();
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

    expect(screen.getByText('Prompt: prompt1')).toBeInTheDocument();
    expect(screen.getByText('Prompt: prompt2')).toBeInTheDocument();

    expect(
      screen.getByText('Text Response: text response 1'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Text Response: text response 2'),
    ).toBeInTheDocument();

    expect(screen.getByText('File Upload')).toBeInTheDocument();
    expect(screen.getByText(/peer/i)).toBeInTheDocument();
  });
});
