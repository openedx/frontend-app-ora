import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useORAConfigData } from 'hooks/app';
import { stepNames } from 'constants/index';

import StudioViewSteps from './StudioViewSteps';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('./XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    assessmentStepsIsOpen: true,
    toggleAssessmentSteps: jest.fn(),
  }),
}));

describe('<StudioViewSteps />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  it('renders without steps when order is empty', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        order: [],
      },
    });

    renderWithIntl(<StudioViewSteps />);

    expect(screen.getByText('Assessment steps')).toBeInTheDocument();
    expect(screen.queryByText(/Step \d+:/)).not.toBeInTheDocument();
  });

  it('renders with steps when order has items', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        order: [stepNames.self, stepNames.peer],
      },
    });

    renderWithIntl(<StudioViewSteps />);

    expect(screen.getByText('Assessment steps')).toBeInTheDocument();
    expect(screen.getByText('Step 1:')).toBeInTheDocument();
    expect(screen.getByText('Step 2:')).toBeInTheDocument();
    expect(screen.getByText('Self assessment')).toBeInTheDocument();
    expect(screen.getByText('Peer assessment')).toBeInTheDocument();
  });

  it('renders correct number of step paragraphs', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        order: [stepNames.self, stepNames.peer, stepNames.staff],
      },
    });

    renderWithIntl(<StudioViewSteps />);

    expect(screen.getByText('Step 1:')).toBeInTheDocument();
    expect(screen.getByText('Step 2:')).toBeInTheDocument();
    expect(screen.getByText('Step 3:')).toBeInTheDocument();
    expect(screen.getByText('Self assessment')).toBeInTheDocument();
    expect(screen.getByText('Peer assessment')).toBeInTheDocument();
    expect(screen.getByText('Staff assessment')).toBeInTheDocument();
  });
});
