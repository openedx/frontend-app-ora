import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useOverallFeedbackPrompt, useOverallFeedbackFormFields } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import OverallFeedback from '.';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/assessment', () => ({
  useOverallFeedbackPrompt: jest.fn(),
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

const messages = {
  'frontend-app-ora.EditableAssessment.overallComments': 'Overall comments',
  'frontend-app-ora.EditableAssessment.addComments': 'Add comments (Optional)',
};

describe('<OverallFeedback />', () => {
  const renderWithIntl = (component) => render(
    <IntlProvider locale="en" messages={messages}>
      {component}
    </IntlProvider>,
  );

  const mockOnChange = jest.fn();
  const mockFeedbackValue = 'Test feedback content';
  const mockPrompt = 'Please provide overall feedback';

  beforeEach(() => {
    jest.clearAllMocks();
    useOverallFeedbackPrompt.mockReturnValue(mockPrompt);
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
