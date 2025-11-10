import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useOverallFeedbackInstructions, useOverallFeedbackFormFields } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import { renderWithIntl } from '../../../../testUtils';
import OverallFeedback from '.';

jest.mock('hooks/assessment', () => ({
  useOverallFeedbackInstructions: jest.fn(),
  useOverallFeedbackFormFields: jest.fn(),
}));

jest.mock('components/InfoPopover', () => ({
  __esModule: true,
  default: ({ children }) => (
    <div role="button" aria-label="Help information">
      {children}
    </div>
  ),
}));

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));

describe('<OverallFeedback />', () => {
  const mockOnChange = jest.fn();
  const mockFeedbackValue = 'Test feedback content';
  const mockInstructions = 'Please provide overall feedback';

  beforeEach(() => {
    jest.clearAllMocks();
    useOverallFeedbackInstructions.mockReturnValue(mockInstructions);
    useOverallFeedbackFormFields.mockReturnValue({
      value: mockFeedbackValue,
      onChange: mockOnChange,
    });
    useViewStep.mockReturnValue('assessment');
  });

  it('renders overall feedback form with prompt and textarea', () => {
    renderWithIntl(<OverallFeedback />);

    expect(screen.getByText('Overall comments')).toBeInTheDocument();
    expect(screen.getByText('Please provide overall feedback')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Help information' })).toBeInTheDocument();
  });

  it('renders nothing when step is studentTraining', () => {
    useViewStep.mockReturnValue(stepNames.studentTraining);

    const { container } = renderWithIntl(<OverallFeedback />);

    expect(container.firstChild).toBeNull();
  });

  it('displays correct form field values from hooks', () => {
    renderWithIntl(<OverallFeedback />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(mockFeedbackValue);
    expect(screen.getByText('Please provide overall feedback')).toBeInTheDocument();
  });
});
