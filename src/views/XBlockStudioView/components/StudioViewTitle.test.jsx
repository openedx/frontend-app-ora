import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import userEvent from '@testing-library/user-event';

import { useORAConfigData } from 'hooks/app';
import { useXBlockStudioViewContext } from './XBlockStudioViewProvider';

import StudioViewTitle from './StudioViewTitle';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('./XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: jest.fn(),
}));

describe('<StudioViewTitle />', () => {
  const mockIsAllClosed = jest.fn();
  const mockToggleAll = jest.fn();

  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  beforeEach(() => {
    useXBlockStudioViewContext.mockReturnValue({
      isAllClosed: mockIsAllClosed,
      toggleAll: mockToggleAll,
    });
    useORAConfigData.mockReturnValue({
      title: 'Test Title',
    });
  });

  it('renders title and expand button when all is closed', () => {
    mockIsAllClosed.mockReturnValue(true);

    renderWithIntl(<StudioViewTitle />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Test Title',
    );
    expect(screen.getByRole('button')).toHaveTextContent('Expand all');
  });

  it('renders title and collapse button when all is not closed', () => {
    mockIsAllClosed.mockReturnValue(false);

    renderWithIntl(<StudioViewTitle />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Test Title',
    );
    expect(screen.getByRole('button')).toHaveTextContent('Collapse all');
  });

  it('calls toggleAll when button is clicked', async () => {
    const user = userEvent.setup();
    mockIsAllClosed.mockReturnValue(true);

    renderWithIntl(<StudioViewTitle />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggleAll).toHaveBeenCalledTimes(1);
  });

  it('has correct CSS class on container', () => {
    mockIsAllClosed.mockReturnValue(true);
    const { container } = renderWithIntl(<StudioViewTitle />);

    expect(container.querySelector('.block-title')).toBeInTheDocument();
  });
});
