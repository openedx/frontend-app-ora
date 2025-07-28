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
jest.mock('components/Assessment', () => () => <div>Assessment</div>);
jest.mock('components/Instructions', () => () => <div>Instructions</div>);
jest.mock('components/ModalActions', () => () => <div>Modal Actions</div>);
jest.mock('components/StatusAlert', () => () => <div>Status Alert</div>);
jest.mock('components/StepProgressIndicator', () => (props) => (
  <div>Step Progress Indicator: {props.step}</div>
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
    expect(screen.getByText('Status Alert')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Modal Actions')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(
      screen.getByText('Step Progress Indicator: self'),
    ).toBeInTheDocument();
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
    expect(
      screen.getByText('Step Progress Indicator: peer'),
    ).toBeInTheDocument();
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
    expect(
      screen.getByText('Step Progress Indicator: studentTraining'),
    ).toBeInTheDocument();
    expect(screen.getByText('Training content')).toBeInTheDocument();
  });

  it('renders all required components', () => {
    useViewStep.mockReturnValue(stepNames.self);
    renderWithIntl(
      <BaseAssessmentView>
        <div>Child component</div>
      </BaseAssessmentView>,
    );

    expect(screen.getByText('Status Alert')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Modal Actions')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(
      screen.getByText('Step Progress Indicator: self'),
    ).toBeInTheDocument();
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });
});
