import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { stepNames } from 'constants/index';
import { useProgressStepData } from './hooks';

import ProgressStep, { stepIcons } from './ProgressStep';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./hooks', () => ({
  useProgressStepData: jest.fn(),
}));

describe('<ProgressStep />', () => {
  const props = {
    step: stepNames.submission,
    canRevisit: true,
    label: 'Test Step',
  };

  const mockProgressStepData = {
    onClick: jest.fn().mockName('onClick'),
    href: 'link',
    isActive: false,
    isEnabled: true,
    isComplete: false,
    isPastDue: false,
    myGrade: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  Object.keys(stepIcons).forEach((step) => {
    it(`renders ${step} step with correct content`, () => {
      useProgressStepData.mockReturnValue(mockProgressStepData);

      render(<ProgressStep {...props} step={step} />);

      expect(screen.getByText('Test Step')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  it('renders step as enabled link when enabled', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isEnabled: true,
    });

    render(<ProgressStep {...props} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute('disabled');
    expect(link).toHaveAttribute('href', 'link');
  });

  it('renders step as disabled when not enabled', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isEnabled: false,
      onClick: undefined,
      href: undefined,
    });

    render(<ProgressStep {...props} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with active styling when active', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isActive: true,
    });

    render(<ProgressStep {...props} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('is-active');
  });

  it('renders error state when past due', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isPastDue: true,
    });

    render(<ProgressStep {...props} />);

    expect(screen.getByText('Test Step')).toBeInTheDocument();
    expect(screen.getByText('Past due!')).toBeInTheDocument();

    // Check for danger styling
    const sublabel = screen.getByText('Past due!');
    expect(sublabel).toHaveClass('text-danger-500');
  });

  it('renders completion state without grade', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isComplete: true,
    });

    render(<ProgressStep {...props} />);

    expect(screen.getByText('Test Step')).toBeInTheDocument();
    expect(screen.queryByTestId('sublabel-test-id')).not.toBeInTheDocument();
  });

  it('renders completion state with grade for done step', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isComplete: true,
      myGrade: {
        stepScore: {
          earned: 1,
          possible: 2,
        },
      },
    });

    render(<ProgressStep {...props} step={stepNames.done} />);

    expect(screen.getByText('Test Step')).toBeInTheDocument();

    const sublabel = screen.getByTestId('sublabel-test-id');
    expect(sublabel).toBeInTheDocument();
    expect(sublabel).toHaveTextContent('1 / 2');
  });

  it('renders with correct CSS classes', () => {
    useProgressStepData.mockReturnValue(mockProgressStepData);

    const { container } = render(<ProgressStep {...props} />);

    const link = container.querySelector('.ora-progress-nav');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('px-0');

    const icon = container.querySelector('.nav-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('my-auto');
  });

  it('applies special styling to icon when sublabel is present', () => {
    useProgressStepData.mockReturnValue({
      ...mockProgressStepData,
      isPastDue: true,
    });

    const { container } = render(<ProgressStep {...props} />);

    const icon = container.querySelector('.nav-icon');
    expect(icon).toHaveStyle({ position: 'relative', bottom: '0.7rem' });
  });
});
