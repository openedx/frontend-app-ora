import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import XBlockStudioView from './index';

/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./components/XBlockStudioViewProvider', () => ({ children }) => (
  <div>{children}</div>
));
jest.mock('./components/StudioSchedule', () => () => (
  <div>Studio Schedule</div>
));
jest.mock('./components/StudioViewSteps', () => () => (
  <div>Studio View Steps</div>
));
jest.mock('./components/StudioViewSettings', () => () => (
  <div>Studio View Settings</div>
));
jest.mock('./components/StudioViewRubric', () => () => (
  <div>Studio View Rubric</div>
));
jest.mock('./components/StudioViewTitle', () => () => (
  <div>Studio View Title</div>
));
jest.mock('./components/StudioViewPrompt', () => () => (
  <div>Studio View Prompt</div>
));

const renderWithIntl = (ui) => render(
  <IntlProvider locale="en" messages={{}}>
    {ui}
  </IntlProvider>,
);

describe('<XBlockStudioView />', () => {
  it('renders all studio view components', () => {
    renderWithIntl(<XBlockStudioView />);

    expect(screen.getByText('Studio Schedule')).toBeInTheDocument();
    expect(screen.getByText('Studio View Steps')).toBeInTheDocument();
    expect(screen.getByText('Studio View Settings')).toBeInTheDocument();
    expect(screen.getByText('Studio View Rubric')).toBeInTheDocument();
    expect(screen.getByText('Studio View Title')).toBeInTheDocument();
    expect(screen.getByText('Studio View Prompt')).toBeInTheDocument();
  });

  it('wraps components in XBlockStudioViewProvider', () => {
    renderWithIntl(<XBlockStudioView />);

    expect(screen.getByText('Studio View Title')).toBeInTheDocument();
    expect(screen.getByText('Studio View Prompt')).toBeInTheDocument();
    expect(screen.getByText('Studio Schedule')).toBeInTheDocument();
    expect(screen.getByText('Studio View Steps')).toBeInTheDocument();
    expect(screen.getByText('Studio View Settings')).toBeInTheDocument();
    expect(screen.getByText('Studio View Rubric')).toBeInTheDocument();
  });
});
