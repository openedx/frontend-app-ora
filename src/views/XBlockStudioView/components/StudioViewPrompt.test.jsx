import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { usePrompts } from 'hooks/app';
import { renderWithIntl } from '../../../testUtils';
import StudioViewPrompt from './StudioViewPrompt';

jest.mock('hooks/app', () => ({
  usePrompts: jest.fn(),
}));
jest.mock('./XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    promptIsOpen: true,
    togglePrompt: jest.fn(),
  }),
}));
jest.mock('components/Prompt', () => {
  // eslint-disable-next-line react/prop-types
  const Prompt = ({ prompt }) => <div data-testid="prompt">{prompt}</div>;
  return Prompt;
});

describe('<StudioViewPrompt />', () => {
  it('renders prompts when prompts array has items', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);

    renderWithIntl(<StudioViewPrompt />);

    expect(screen.getAllByTestId('prompt')).toHaveLength(2);
    expect(screen.getByText('prompt1')).toBeInTheDocument();
    expect(screen.getByText('prompt2')).toBeInTheDocument();
  });

  it('renders no prompts when prompts array is empty', () => {
    usePrompts.mockReturnValue([]);

    renderWithIntl(<StudioViewPrompt />);

    expect(screen.queryByTestId('prompt')).not.toBeInTheDocument();
  });
});
