import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import GradedCriterion from './GradedCriterion';

const renderComponent = (props = {}) => render(
  <IntlProvider
    messages={{
      'frontend-app-ora.RadioCriterion.optionPoints': '{points} points',
    }}
    locale="en"
  >
    <GradedCriterion {...props} />
  </IntlProvider>,
);

describe('GradedCriterion', () => {
  const defaultProps = {
    selectedOption: {
      name: 'option1',
      label: 'Option 1',
      points: 5,
    },
    feedbackValue: 'Feedback text',
  };

  it('displays the option label and points', () => {
    renderComponent(defaultProps);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('5 points')).toBeInTheDocument();
  });

  it('displays the option name if label is not provided', () => {
    const props = {
      selectedOption: {
        name: 'option1',
        points: 5,
      },
    };
    renderComponent(props);

    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('5 points')).toBeInTheDocument();
  });

  it('displays feedback when provided', () => {
    renderComponent(defaultProps);
    expect(screen.getByText('Feedback text')).toBeInTheDocument();
  });

  it('does not display feedback when not provided', () => {
    const props = {
      selectedOption: defaultProps.selectedOption,
    };
    renderComponent(props);
    expect(screen.queryByText('Feedback text')).not.toBeInTheDocument();
  });
});
