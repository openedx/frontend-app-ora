import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import messages from '../messages';
import BaseAssessmentView from './index';

/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('components/Assessment', () => () => (
  <div data-testid="assessment">Assessment</div>
));
jest.mock('components/Instructions', () => () => (
  <div data-testid="instructions">Instructions</div>
));
jest.mock('components/ModalActions', () => () => (
  <div data-testid="modal-actions">Modal Actions</div>
));
jest.mock('components/StatusAlert', () => () => (
  <div data-testid="status-alert">Status Alert</div>
));
jest.mock('components/StepProgressIndicator', () => (props) => (
  <div data-testid="step-progress-indicator">Step: {props.step}</div>
));

const renderWithIntl = (ui) => {
  const testMessages = {
    'frontend-app-ora.selfAssessmentView.header':
      messages[stepNames.self].defaultMessage,
    'frontend-app-ora.peerAssessmentView.header':
      messages[stepNames.peer].defaultMessage,
    'frontend-app-ora.studentTrainingView.header':
      messages[stepNames.studentTraining].defaultMessage,
  };

  return render(
    <IntlProvider locale="en" messages={testMessages}>
      {ui}
    </IntlProvider>,
  );
};

describe('<BaseAssessmentView />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with self assessment step', () => {
    useViewStep.mockReturnValue(stepNames.self);
    renderWithIntl(
      <BaseAssessmentView>
        <div>Test children content</div>
      </BaseAssessmentView>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Self grading',
    );
    expect(screen.getByTestId('status-alert')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('modal-actions')).toBeInTheDocument();
    expect(screen.getByTestId('assessment')).toBeInTheDocument();
    expect(screen.getByTestId('step-progress-indicator')).toHaveTextContent(
      'Step: self',
    );
    expect(screen.getByText('Test children content')).toBeInTheDocument();
  });

  it('renders with peer assessment step', () => {
    useViewStep.mockReturnValue(stepNames.peer);
    renderWithIntl(
      <BaseAssessmentView>
        <div>Peer content</div>
      </BaseAssessmentView>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Grade your peers',
    );
    expect(screen.getByTestId('step-progress-indicator')).toHaveTextContent(
      'Step: peer',
    );
    expect(screen.getByText('Peer content')).toBeInTheDocument();
  });

  it('renders with student training step', () => {
    useViewStep.mockReturnValue(stepNames.studentTraining);
    renderWithIntl(
      <BaseAssessmentView>
        <div>Training content</div>
      </BaseAssessmentView>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Practice grading',
    );
    expect(screen.getByTestId('step-progress-indicator')).toHaveTextContent(
      'Step: studentTraining',
    );
    expect(screen.getByText('Training content')).toBeInTheDocument();
  });

  it('renders all required components', () => {
    useViewStep.mockReturnValue(stepNames.self);
    renderWithIntl(
      <BaseAssessmentView>
        <div>Child component</div>
      </BaseAssessmentView>,
    );

    expect(screen.getByTestId('status-alert')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('modal-actions')).toBeInTheDocument();
    expect(screen.getByTestId('assessment')).toBeInTheDocument();
    expect(screen.getByTestId('step-progress-indicator')).toBeInTheDocument();
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });
});
