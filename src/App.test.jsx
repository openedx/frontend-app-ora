import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { MemoryRouter } from 'react-router-dom';
import { useHandleModalCloseEvent } from 'hooks/modal';

import App from './App';
/* eslint-disable react/prop-types */

jest.mock('hooks/modal', () => ({
  useHandleModalCloseEvent: jest.fn(),
}));

jest.mock('@edx/frontend-platform/react', () => ({
  ErrorPage: ({ message }) => <div role="alert">{message || 'Error Page'}</div>,
}));

// mock this out to avoid testing the PageRoute wrapper component here
jest.mock('components/PageRoute', () => ({ children }) => children);

jest.mock('views/AssessmentView', () => () => <div>Mocked AssessmentView</div>);
jest.mock('views/XBlockView', () => () => <div>Mocked XBlockView</div>);
jest.mock('views/XBlockStudioView', () => () => <div>Mocked XBlockStudioView</div>);
jest.mock('views/SubmissionView', () => () => <div>Mocked SubmissionView</div>);
jest.mock('views/GradeView', () => () => <div>Mocked GradeView</div>);

const handleModalClose = jest.fn();
const addEventListener = jest.fn();
const removeEventListener = jest.fn();

describe('App component', () => {
  const renderWithProviders = (component, initialEntries = '/') => render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <IntlProvider locale="en" messages={{}}>
        {component}
      </IntlProvider>
    </MemoryRouter>,
  );

  const routes = {
    xblock: '/xblock/course123/xblock456/progress789',
    xblockStudio: '/xblock_studio/course123/xblock456/progress789',
    peerAssessment: '/peer_assessment/course123/xblock456/progress789',
    submission: '/submission/course123/xblock456/submission789',
    graded: '/graded/course123/xblock456/submission789',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useHandleModalCloseEvent.mockReturnValue(handleModalClose);
    jest.spyOn(window, 'addEventListener').mockImplementation(addEventListener);
    jest
      .spyOn(window, 'removeEventListener')
      .mockImplementation(removeEventListener);
  });

  it('renders app with assessment view page', () => {
    renderWithProviders(<App />, routes.peerAssessment);
    expect(screen.getByText('Mocked AssessmentView')).toBeInTheDocument();
  });

  it('renders app with xblock view page', () => {
    renderWithProviders(<App />, routes.xblock);
    expect(screen.getByText('Mocked XBlockView')).toBeInTheDocument();
  });

  it('renders app with xblock studio view page', () => {
    renderWithProviders(<App />, routes.xblockStudio);
    expect(screen.getByText('Mocked XBlockStudioView')).toBeInTheDocument();
  });

  it('renders app with SubmissionView view page', () => {
    renderWithProviders(<App />, routes.submission);
    expect(screen.getByText('Mocked SubmissionView')).toBeInTheDocument();
  });

  it('renders app with GradeView view page', () => {
    renderWithProviders(<App />, routes.graded);
    expect(screen.getByText('Mocked GradeView')).toBeInTheDocument();
  });

  it('renders app with accessible error page fallback', () => {
    renderWithProviders(<App />);

    expect(screen.getByRole('alert')).toHaveTextContent('Page not found');
  });

  it('calls useHandleModalCloseEvent hook and sets up event listeners', () => {
    renderWithProviders(<App />);
    expect(useHandleModalCloseEvent).toHaveBeenCalled();
    expect(addEventListener).toHaveBeenCalledWith('message', handleModalClose);
  });

  it('removes event listener on unmount', () => {
    const { unmount } = renderWithProviders(<App />);

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith(
      'message',
      handleModalClose,
    );
  });
});
