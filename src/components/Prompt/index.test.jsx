import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useActiveStepName, useORAConfigData } from 'hooks/app';
import { useViewStep } from 'hooks/routing';
import { renderWithIntl } from '../../testUtils';
import Prompt from './index';

jest.mock('hooks/app', () => ({
  useActiveStepName: jest.fn(),
  useORAConfigData: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));

describe('<Prompt />', () => {
  const props = {
    prompt: '<p>Test prompt content</p>',
    title: 'Test Title',
  };

  beforeEach(() => {
    useActiveStepName.mockReturnValue('submission');
    useORAConfigData.mockReturnValue({ baseAssetUrl: 'baseAssetUrl/' });
    useViewStep.mockReturnValue('submission');
  });

  it('renders prompt with default collapsible behavior', () => {
    renderWithIntl(<Prompt {...props} />);

    // Check if the prompt content is rendered
    expect(screen.getByText('Test prompt content')).toBeInTheDocument();

    // Check if the title is rendered
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('renders prompt with controlled collapsible behavior', () => {
    const mockOnToggle = jest.fn();

    renderWithIntl(<Prompt {...props} open onToggle={mockOnToggle} />);

    // Check if the prompt content is rendered
    expect(screen.getByText('Test prompt content')).toBeInTheDocument();

    // Check if the title is rendered
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('renders prompt content with dangerouslySetInnerHTML', () => {
    const { container } = renderWithIntl(<Prompt {...props} />);

    // Check if the div with class 'prompt' exists
    const promptDiv = container.querySelector('.prompt');
    expect(promptDiv).toBeInTheDocument();

    // Check if the HTML content is rendered
    expect(promptDiv).toHaveTextContent('Test prompt content');
  });

  describe('URL replacement functionality', () => {
    const getPromptHtml = (prompt) => {
      const { container } = renderWithIntl(
        <Prompt {...props} prompt={prompt} />,
      );
      const promptDiv = container.querySelector('.prompt');
      return promptDiv.innerHTML;
    };

    const arbitraryEndpoint = '/abc/def/ghi';
    const fullAssetUrl = `http://localhost:18000/asset-v1${arbitraryEndpoint}`;
    const fullStaticAssetUrl = `http://localhost:18000/baseAssetUrl${arbitraryEndpoint}`;
    const relativeAssetUrl = `/asset-v1${arbitraryEndpoint}`;
    const relativeStaticAssetUrl = `/static${arbitraryEndpoint}`;

    it('does not update url for anchor and image that is not using relative url', () => {
      expect(getPromptHtml(`<img src="${fullAssetUrl}" />`)).toBe(
        `<img src="${fullAssetUrl}">`,
      );
      expect(getPromptHtml(`<a href="${fullAssetUrl}" />`)).toBe(
        `<a href="${fullAssetUrl}"></a>`,
      );
      // ignore non image and anchor
      expect(getPromptHtml(`<object data="${relativeAssetUrl}" />`)).toBe(
        `<object data="${relativeAssetUrl}"></object>`,
      );
    });

    it('updates assets url for anchor and image', () => {
      expect(getPromptHtml(`<img src="${relativeAssetUrl}" />`)).toBe(
        `<img src="${fullAssetUrl}">`,
      );
      expect(getPromptHtml(`<a href="${relativeAssetUrl}" />`)).toBe(
        `<a href="${fullAssetUrl}"></a>`,
      );
    });

    it('updates static assets url for anchor and image', () => {
      expect(getPromptHtml(`<img src="${relativeStaticAssetUrl}" />`)).toBe(
        `<img src="${fullStaticAssetUrl}">`,
      );
      expect(getPromptHtml(`<a href="${relativeStaticAssetUrl}" />`)).toBe(
        `<a href="${fullStaticAssetUrl}"></a>`,
      );
    });
  });

  it('renders with appropriate CSS classes', () => {
    const { container } = renderWithIntl(<Prompt {...props} />);

    // Check if the prompt div has the correct class
    const promptDiv = container.querySelector('.prompt');
    expect(promptDiv).toHaveClass('prompt');

    // Check if the title has the correct class
    const titleHeading = container.querySelector('h3');
    expect(titleHeading).toHaveClass('py-3');
  });
});
