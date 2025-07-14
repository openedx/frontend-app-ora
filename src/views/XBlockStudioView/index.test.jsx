import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import XBlockStudioView from './index';

/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./components/XBlockStudioViewProvider', () => ({ children }) => (
  <div data-testid="xblock-studio-view-provider">{children}</div>
));
jest.mock('./components/StudioSchedule', () => () => (
  <div data-testid="studio-schedule">Studio Schedule</div>
));
jest.mock('./components/StudioViewSteps', () => () => (
  <div data-testid="studio-view-steps">Studio View Steps</div>
));
jest.mock('./components/StudioViewSettings', () => () => (
  <div data-testid="studio-view-settings">Studio View Settings</div>
));
jest.mock('./components/StudioViewRubric', () => () => (
  <div data-testid="studio-view-rubric">Studio View Rubric</div>
));
jest.mock('./components/StudioViewTitle', () => () => (
  <div data-testid="studio-view-title">Studio View Title</div>
));
jest.mock('./components/StudioViewPrompt', () => () => (
  <div data-testid="studio-view-prompt">Studio View Prompt</div>
));

const renderWithIntl = (ui) => render(
  <IntlProvider locale="en" messages={{}}>
    {ui}
  </IntlProvider>,
);

describe('<XBlockStudioView />', () => {
  it('renders all studio view components', () => {
    renderWithIntl(<XBlockStudioView />);

    expect(
      screen.getByTestId('xblock-studio-view-provider'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('studio-schedule')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-steps')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-settings')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-rubric')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-title')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-prompt')).toBeInTheDocument();
  });

  it('wraps components in XBlockStudioViewProvider', () => {
    renderWithIntl(<XBlockStudioView />);

    const provider = screen.getByTestId('xblock-studio-view-provider');
    expect(provider).toBeInTheDocument();

    expect(screen.getByTestId('studio-view-title')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-prompt')).toBeInTheDocument();
    expect(screen.getByTestId('studio-schedule')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-steps')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-settings')).toBeInTheDocument();
    expect(screen.getByTestId('studio-view-rubric')).toBeInTheDocument();
  });
});
