import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { MemoryRouter } from 'react-router-dom';

import { useHandleModalCloseEvent } from 'hooks/modal';

import App from './App';

/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/modal', () => ({
  useHandleModalCloseEvent: jest.fn(),
}));

jest.mock('@edx/frontend-platform/react', () => ({
  ErrorPage: ({ message }) => <div role="alert">{message || 'Error Page'}</div>,
}));

const handleModalClose = jest.fn();
const addEventListener = jest.fn();
const removeEventListener = jest.fn();

describe('App component', () => {
  const renderWithProviders = (component) => render(
    <MemoryRouter>
      <IntlProvider locale="en" messages={{}}>
        {component}
      </IntlProvider>
    </MemoryRouter>,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    useHandleModalCloseEvent.mockReturnValue(handleModalClose);
    jest.spyOn(window, 'addEventListener').mockImplementation(addEventListener);
    jest
      .spyOn(window, 'removeEventListener')
      .mockImplementation(removeEventListener);
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
