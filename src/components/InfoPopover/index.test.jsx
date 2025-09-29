import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import InfoPopover from './index';

describe('<InfoPopover />', () => {
  const props = {
    onClick: jest.fn().mockName('onClick'),
  };

  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders info icon button', () => {
    renderWithIntl(
      <InfoPopover {...props}>
        <div>Help content</div>
      </InfoPopover>,
    );

    const iconButton = screen.getByRole('button');
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveClass('esg-help-icon');
    expect(iconButton).toHaveClass('mb-2');
    expect(iconButton).toHaveClass('ml-2');
  });

  it('calls onClick when icon button is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(
      <InfoPopover {...props}>
        <div>Help content</div>
      </InfoPopover>,
    );

    const iconButton = screen.getByRole('button');
    await user.click(iconButton);

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders children content in popover when focused', async () => {
    const user = userEvent.setup();
    renderWithIntl(
      <InfoPopover {...props}>
        <div>Detailed help information</div>
      </InfoPopover>,
    );

    const iconButton = screen.getByRole('button');

    // Focus the button to trigger the popover
    await user.click(iconButton);

    // Check if popover content appears
    expect(screen.getByText('Detailed help information')).toBeInTheDocument();
  });

  it('renders with proper accessibility attributes', () => {
    renderWithIntl(
      <InfoPopover {...props}>
        <div>Help content</div>
      </InfoPopover>,
    );

    const iconButton = screen.getByRole('button');
    expect(iconButton).toHaveAttribute('type', 'button');
  });

  it('renders without onClick when not provided', () => {
    renderWithIntl(
      <InfoPopover>
        <div>Help content</div>
      </InfoPopover>,
    );

    const iconButton = screen.getByRole('button');
    expect(iconButton).toBeInTheDocument();
  });
});
