import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from 'testUtils';
import { stepNames } from 'constants/index';
import { usePrompts, useSubmissionConfig } from 'hooks/app';
import messages from '../../components/Prompt/messages';

import SubmissionPrompts from './SubmissionPrompts';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/submission/course123/xblock456/submission789' }),
}));

jest.mock('hooks/app', () => ({
  usePrompts: jest.fn(),
  useSubmissionConfig: jest.fn(),
  useActiveStepName: () => 'self',
  useORAConfigData: () => ({ baseAssetUrl: 'static/ora' }),
}));

/* eslint-disable react/prop-types */

const mockProps = {
  textResponses: ['response1', 'response2'],
  onUpdateTextResponse: jest.fn(),
  isReadOnly: false,
  promptStatuses: { 0: 1, 1: 1 },
};
const mockPropsSingleResponse = {
  textResponses: ['response1'],
  onUpdateTextResponse: jest.fn(),
  isReadOnly: true,
  promptStatuses: { 0: 1 },
};

describe('<SubmissionPrompts />', () => {
  const mockOnUpdateTextResponse = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnUpdateTextResponse.mockImplementation(() => () => {});
  });

  it('renders text response editor when readOnly is false', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useSubmissionConfig.mockReturnValue({ textResponseConfig: { editorType: 'text', allowLatexPreview: true, enabled: true } });
    renderWithIntl(<SubmissionPrompts {...mockProps} />);
    expect(screen.getAllByRole('heading', { name: messages[stepNames.submission].defaultMessage })).toHaveLength(2);
    expect(screen.getByText('prompt1')).toBeInTheDocument();
    expect(screen.getByText('prompt2')).toBeInTheDocument();
    expect(screen.getByText('response1')).toBeInTheDocument();
    expect(screen.getByText('response2')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Preview in LaTeX' })).toHaveLength(2);
    expect(mockProps.onUpdateTextResponse).toHaveBeenCalled();
  });

  it('renders single text response when readOnly is true', () => {
    usePrompts.mockReturnValue(['prompt1']);
    useSubmissionConfig.mockReturnValue({ textResponseConfig: { enabled: true } });
    renderWithIntl(<SubmissionPrompts {...mockPropsSingleResponse} />);
    expect(screen.getAllByRole('heading', { name: messages[stepNames.submission].defaultMessage })).toHaveLength(1);
    expect(screen.getByText('prompt1')).toBeInTheDocument();
  });

  it('renders empty prompts', () => {
    usePrompts.mockReturnValue([]);
    useSubmissionConfig.mockReturnValue({ textResponseConfig: { enabled: true } });
    renderWithIntl(<SubmissionPrompts {...mockProps} />);
    expect(screen.queryByText(/^Prompt:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Response:/)).not.toBeInTheDocument();
  });

  it('does not render response when textResponseConfig is disabled', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useSubmissionConfig.mockReturnValue({ textResponseConfig: { enabled: false } });
    renderWithIntl(<SubmissionPrompts {...mockProps} />);
    expect(screen.getByText('prompt1')).toBeInTheDocument();
    expect(screen.getByText('prompt2')).toBeInTheDocument();
    expect(screen.queryByText(/^Response:/)).not.toBeInTheDocument();
  });
});
