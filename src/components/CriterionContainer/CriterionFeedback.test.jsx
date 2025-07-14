import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import {
  useShowValidation,
  useCriterionFeedbackFormFields,
} from 'hooks/assessment';

import CriterionFeedback from './CriterionFeedback';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/assessment');
jest.mock('hooks/routing');

const mockMessages = {
  'frontend-app-ora.CriterionFeedback.addCommentsLabel': 'Add comments',
  'frontend-app-ora.CriterionFeedback.optional': '(Optional)',
  'frontend-app-ora.CriterionFeedback.criterionFeedbackError':
    'The feedback is required',
};

const withIntl = (component) => (
  <IntlProvider locale="en" messages={mockMessages}>
    {component}
  </IntlProvider>
);

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

    const { container } = render(withIntl(<CriterionFeedback {...props} />));

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when feedback is not enabled', () => {
    useViewStep.mockReturnValue(stepNames.self);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: false,
    });

    const { container } = render(
      withIntl(
        <CriterionFeedback
          {...props}
          criterion={{
            feedbackEnabled: false,
            feedbackRequired: false,
          }}
        />,
      ),
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

    render(withIntl(<CriterionFeedback {...props} />));

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

    render(withIntl(<CriterionFeedback {...props} />));

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

    render(
      withIntl(
        <CriterionFeedback
          {...props}
          criterion={{
            feedbackEnabled: true,
            feedbackRequired: false,
          }}
        />,
      ),
    );

    expect(
      screen.getByRole('textbox', { name: /add comments \(optional\)/i }),
    ).toBeInTheDocument();
  });
});
