import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import {
  useORAConfigData,
  usePrompts,
  useRubricConfig,
  useGlobalState,
} from 'hooks/app';

import XBlockView from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

// Only mock the hooks that provide data
jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
  usePrompts: jest.fn(),
  useRubricConfig: jest.fn(),
  useGlobalState: jest.fn(),
}));

// Mock child components to avoid their complex dependencies
jest.mock('components/ProgressBar', () => () => (
  <div data-testid="progress-bar">ProgressBar</div>
));
// eslint-disable-next-line react/prop-types
jest.mock('components/Prompt', () => ({ prompt }) => (
  <div data-testid="prompt">{prompt}</div>
));
// eslint-disable-next-line react/prop-types
jest.mock('components/Rubric', () => ({ isCollapsible }) => (
  <div data-testid="rubric">
    {isCollapsible ? 'Collapsible' : 'Not Collapsible'}
  </div>
));
jest.mock('components/Instructions', () => () => (
  <div data-testid="instructions">Instructions</div>
));
jest.mock('components/StatusAlert', () => () => (
  <div data-testid="status-alert">StatusAlert</div>
));
jest.mock('components/HotjarSurvey', () => () => (
  <div data-testid="hotjar-survey">HotjarSurvey</div>
));
jest.mock('./StatusRow', () => () => (
  <div data-testid="status-row">StatusRow</div>
));
jest.mock('./Actions', () => () => <div data-testid="actions">Actions</div>);

describe('<XBlockView />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders everything with title and prompts', () => {
    useORAConfigData.mockReturnValue({ title: 'Test Title' });
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useRubricConfig.mockReturnValue({ showDuringResponse: true });
    useGlobalState.mockReturnValue({ stepIsUnavailable: false });

    renderWithIntl(<XBlockView />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('status-row')).toBeInTheDocument();
    expect(screen.getByTestId('status-alert')).toBeInTheDocument();
    expect(screen.getByTestId('hotjar-survey')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('actions')).toBeInTheDocument();
    expect(screen.getAllByTestId('prompt')).toHaveLength(2);
    expect(screen.getByText('prompt1')).toBeInTheDocument();
    expect(screen.getByText('prompt2')).toBeInTheDocument();
    expect(screen.getByTestId('rubric')).toBeInTheDocument();
    expect(screen.getByText('Collapsible')).toBeInTheDocument();
  });

  it('renders everything without rubric when showDuringResponse is false', () => {
    useORAConfigData.mockReturnValue({ title: 'Test Title' });
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useRubricConfig.mockReturnValue({ showDuringResponse: false });
    useGlobalState.mockReturnValue({ stepIsUnavailable: false });

    renderWithIntl(<XBlockView />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getAllByTestId('prompt')).toHaveLength(2);
    expect(screen.getByText('prompt1')).toBeInTheDocument();
    expect(screen.getByText('prompt2')).toBeInTheDocument();
    expect(screen.queryByTestId('rubric')).not.toBeInTheDocument();
  });

  it('does not render prompts and rubric when step is unavailable', () => {
    useORAConfigData.mockReturnValue({ title: 'Test Title' });
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useRubricConfig.mockReturnValue({ showDuringResponse: true });
    useGlobalState.mockReturnValue({ stepIsUnavailable: true });

    renderWithIntl(<XBlockView />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('status-row')).toBeInTheDocument();
    expect(screen.getByTestId('status-alert')).toBeInTheDocument();
    expect(screen.getByTestId('hotjar-survey')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('actions')).toBeInTheDocument();
    expect(screen.queryByTestId('prompt')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rubric')).not.toBeInTheDocument();
  });

  it('renders correct heading structure', () => {
    useORAConfigData.mockReturnValue({ title: 'Test Title' });
    usePrompts.mockReturnValue([]);
    useRubricConfig.mockReturnValue({ showDuringResponse: false });
    useGlobalState.mockReturnValue({ stepIsUnavailable: false });

    renderWithIntl(<XBlockView />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Title');
  });
});
