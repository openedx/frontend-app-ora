import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import useInstructionsMessage from './useInstructionsMessage';

import Instructions from './index';

jest.mock('./useInstructionsMessage', () => jest.fn());

describe('<Instructions />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  it('renders nothing when no message is provided', () => {
    useInstructionsMessage.mockReturnValue(null);

    const { container } = renderWithIntl(<Instructions />);
    expect(container.firstChild).toBeNull();
  });

  it('renders instructions message when provided', () => {
    useInstructionsMessage.mockReturnValue(
      'Complete the assignment by following these steps',
    );

    renderWithIntl(<Instructions />);

    expect(screen.getByText('Instructions:')).toBeInTheDocument();
    expect(
      screen.getByText('Complete the assignment by following these steps'),
    ).toBeInTheDocument();
  });

  it('renders with correct styling and structure', () => {
    useInstructionsMessage.mockReturnValue('Test instructions');

    const { container } = renderWithIntl(<Instructions />);

    const instructionsDiv = container.querySelector('.py-4');
    expect(instructionsDiv).toBeInTheDocument();

    const paragraph = container.querySelector('p.mb-0');
    expect(paragraph).toBeInTheDocument();

    const strongElement = container.querySelector('strong');
    expect(strongElement).toBeInTheDocument();
    expect(strongElement).toHaveTextContent('Instructions:');
  });
});
