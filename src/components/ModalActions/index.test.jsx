import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useIsPageDataLoading } from 'hooks/app';
import useModalActionConfig from './hooks/useModalActionConfig';

import ModalActions from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useIsPageDataLoading: jest.fn(),
}));
jest.mock('./hooks/useModalActionConfig', () => jest.fn());

describe('<ModalActions />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  const props = {
    options: {},
  };
  beforeEach(() => {
    useIsPageDataLoading.mockReturnValue(false);
  });

  it('renders skeleton when page data is loading', () => {
    useIsPageDataLoading.mockReturnValueOnce(true);
    useModalActionConfig.mockReturnValue({});
    const { container } = renderWithIntl(<ModalActions {...props} />);
    expect(
      container.querySelector('.react-loading-skeleton'),
    ).toBeInTheDocument();
  });

  it('renders empty actions container when no actions are configured', () => {
    useModalActionConfig.mockReturnValue({});
    const { container } = renderWithIntl(<ModalActions {...props} />);
    const actionDiv = container.querySelector('.mt-2');
    expect(actionDiv).toBeInTheDocument();
    expect(actionDiv).toBeEmptyDOMElement();
  });

  it('renders primary and secondary buttons without confirm dialogs', () => {
    useModalActionConfig.mockReturnValue({
      primary: {
        action: {
          children: 'Primary Action',
          onClick: jest.fn(),
        },
      },
      secondary: {
        action: {
          children: 'Secondary Action',
          onClick: jest.fn(),
        },
      },
    });
    renderWithIntl(<ModalActions {...props} />);

    expect(
      screen.getByRole('button', { name: 'Primary Action' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Secondary Action' }),
    ).toBeInTheDocument();
  });

  it('renders primary and secondary buttons with confirm dialogs', () => {
    useModalActionConfig.mockReturnValue({
      primary: {
        action: {
          children: 'Primary Action',
          onClick: jest.fn(),
        },
        confirmProps: {
          title: 'Confirm Primary',
          description: 'Are you sure?',
          action: { onClick: jest.fn() },
          isOpen: false,
          close: jest.fn(),
        },
      },
      secondary: {
        action: {
          children: 'Secondary Action',
          onClick: jest.fn(),
        },
        confirmProps: {
          title: 'Confirm Secondary',
          description: 'Are you sure?',
          action: { onClick: jest.fn() },
          isOpen: false,
          close: jest.fn(),
        },
      },
    });
    renderWithIntl(<ModalActions {...props} />);

    expect(
      screen.getByRole('button', { name: 'Primary Action' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Secondary Action' }),
    ).toBeInTheDocument();
  });
});
