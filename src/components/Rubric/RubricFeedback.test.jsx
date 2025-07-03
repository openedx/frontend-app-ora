import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import userEvent from '@testing-library/user-event';

import RubricFeedback from './RubricFeedback';
import messages from './messages';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

// eslint-disable-next-line react/prop-types
jest.mock('components/InfoPopover', () => ({ children }) => (
  <div data-testid="info-popover">{children}</div>
));

describe('<RubricFeedback />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  const props = {
    overallFeedbackPrompt: 'overallFeedbackPrompt',
    overallFeedback: 'overallFeedback',
    overallFeedbackDisabled: false,
    overallFeedbackIsInvalid: false,
    onOverallFeedbackChange: jest.fn().mockName('onOverallFeedbackChange'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('renders', () => {
    it('overall feedback is enabled', () => {
      renderWithIntl(<RubricFeedback {...props} />);

      expect(
        screen.getByText(messages.overallComments.defaultMessage),
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue('overallFeedback')).toBeInTheDocument();
      expect(screen.getByDisplayValue('overallFeedback')).not.toBeDisabled();
      expect(
        screen.getByLabelText(messages.addComments.defaultMessage),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(messages.overallFeedbackError.defaultMessage),
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('info-popover')).toBeInTheDocument();
      expect(screen.getByText('overallFeedbackPrompt')).toBeInTheDocument();
    });

    it('overall feedback is disabled', () => {
      renderWithIntl(<RubricFeedback {...props} overallFeedbackDisabled />);

      expect(
        screen.getByText(messages.overallComments.defaultMessage),
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue('overallFeedback')).toBeInTheDocument();
      expect(screen.getByDisplayValue('overallFeedback')).toBeDisabled();
      expect(
        screen.getByLabelText(messages.comments.defaultMessage),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(messages.overallFeedbackError.defaultMessage),
      ).not.toBeInTheDocument();
    });

    it('overall feedback is invalid', () => {
      renderWithIntl(<RubricFeedback {...props} overallFeedbackIsInvalid />);

      expect(
        screen.getByText(messages.overallComments.defaultMessage),
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue('overallFeedback')).toBeInTheDocument();
      expect(
        screen.getByText(messages.overallFeedbackError.defaultMessage),
      ).toBeInTheDocument();
    });

    it('handles feedback change', async () => {
      const user = userEvent.setup();
      renderWithIntl(<RubricFeedback {...props} overallFeedback="" />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'new feedback');

      expect(props.onOverallFeedbackChange).toHaveBeenCalled();
    });
  });
});
