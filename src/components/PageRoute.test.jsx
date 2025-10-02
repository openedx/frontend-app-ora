import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageRoute from './PageRoute';

jest.mock('react-router-dom', () => ({ Route: 'Route' }));
jest.mock('@edx/frontend-platform/react', () => ({
  // eslint-disable-next-line react/prop-types
  AuthenticatedPageRoute: ({ children }) => (
    <div data-testid="authenticated-page-route">{children}</div>
  ),
}));
// eslint-disable-next-line react/prop-types
jest.mock('components/AppContainer', () => ({ children }) => (
  <div data-testid="app-container">{children}</div>
));
// eslint-disable-next-line react/prop-types
jest.mock('components/ModalContainer', () => ({ children }) => (
  <div data-testid="modal-container">{children}</div>
));

const props = {
  route: 'test-route',
  children: <div data-testid="test-children">test children</div>,
};

describe('PageRoute component', () => {
  it('renders with ModalContainer when isModal is true', () => {
    render(<PageRoute {...props} isModal />);

    expect(screen.getByTestId('authenticated-page-route')).toBeInTheDocument();
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
  });

  it('renders without ModalContainer when isModal is false', () => {
    render(<PageRoute {...props} />);

    expect(screen.getByTestId('authenticated-page-route')).toBeInTheDocument();
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
    expect(screen.queryByTestId('modal-container')).not.toBeInTheDocument();
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
  });
});
