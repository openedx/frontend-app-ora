import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import {
  useShowValidation,
  useCriterionFeedbackFormFields,
} from 'hooks/assessment';

import { renderWithIntl } from 'testUtils';

import CriterionFeedback from './CriterionFeedback';
import messages from './messages';

jest.mock('hooks/assessment');
jest.mock('hooks/routing');

describe('<CriterionFeedback />', () => {
  const props = {
    criterion: {
      feedbackEnabled: true,
      feedbackRequired: true,
    },
    criterionIndex: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing on student training step', () => {
    useViewStep.mockReturnValue(stepNames.studentTraining);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: false,
    });

    const { container } = renderWithIntl(<CriterionFeedback {...props} />, messages);

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when feedback is not enabled', () => {
    useViewStep.mockReturnValue(stepNames.self);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: false,
    });

    const { container } = renderWithIntl(
      <CriterionFeedback {...props} criterion={{ feedbackEnabled: false, feedbackRequired: false }} />,
      messages,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders with validation error when required feedback is missing', () => {
    useViewStep.mockReturnValue(stepNames.self);
    useShowValidation.mockReturnValue(true);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: true,
    });

    renderWithIntl(<CriterionFeedback {...props} />, messages);

    expect(
      screen.getByRole('textbox', { name: /add comments/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('The feedback is required')).toBeInTheDocument();
  });

  it('renders without validation error when validation is not shown', () => {
    useViewStep.mockReturnValue(stepNames.self);
    useShowValidation.mockReturnValue(false);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: false,
    });

    renderWithIntl(<CriterionFeedback {...props} />, messages);

    expect(
      screen.getByRole('textbox', { name: /add comments/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('The feedback is required'),
    ).not.toBeInTheDocument();
  });

  it('renders optional label when feedback is not required', () => {
    useViewStep.mockReturnValue(stepNames.self);
    useShowValidation.mockReturnValue(false);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: false,
    });
    renderWithIntl(
      <CriterionFeedback {...props} criterion={{ feedbackEnabled: true, feedbackRequired: false }} />,
      messages,
    );

    expect(
      screen.getByRole('textbox', { name: /add comments \(optional\)/i }),
    ).toBeInTheDocument();
  });
});
