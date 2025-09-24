import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from 'testUtils';

import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import messages from '../messages';
import BaseAssessmentView from './index';

/* eslint-disable react/prop-types */

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));

jest.mock('components/Assessment', () => () => (
  <div>Assessment</div>
));
jest.mock('components/Instructions', () => () => (
  <div>Instructions</div>
));
jest.mock('components/ModalActions', () => () => (
  <div>Modal Actions</div>
));
jest.mock('components/StatusAlert', () => () => (
  <div>Status Alert</div>
));
jest.mock('components/StepProgressIndicator', () => (props) => (
  <div>Step: {props.step}</div>
));

describe('<BaseAssessmentView />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with self assessment step', () => {
    useViewStep.mockReturnValue(stepNames.self);
    renderWithProviders(<BaseAssessmentView><div>Mocked Children</div></BaseAssessmentView>, messages);
    expect(screen.getByRole('heading', { name: messages[stepNames.self].defaultMessage })).toBeInTheDocument();
    expect(screen.getByText('Step: self')).toBeInTheDocument();
    expect(screen.getByText('Mocked Children')).toBeInTheDocument();
  });

  it('renders with peer assessment step', () => {
    useViewStep.mockReturnValue(stepNames.peer);
    renderWithProviders(<BaseAssessmentView><div>Peer Children</div></BaseAssessmentView>, messages);
    expect(screen.getByRole('heading', { name: messages[stepNames.peer].defaultMessage })).toBeInTheDocument();
    expect(screen.getByText('Peer Children')).toBeInTheDocument();
    expect(screen.getByText('Step: peer')).toBeInTheDocument();
  });

  it('renders with student training step', () => {
    useViewStep.mockReturnValue(stepNames.studentTraining);
    renderWithProviders(<BaseAssessmentView><div>Training Children</div></BaseAssessmentView>, messages);
    expect(screen.getByRole('heading', { name: messages[stepNames.studentTraining].defaultMessage })).toBeInTheDocument();
    expect(screen.getByText('Training Children')).toBeInTheDocument();
    expect(screen.getByText('Step: studentTraining')).toBeInTheDocument();
  });

  it('renders all required components', () => {
    useViewStep.mockReturnValue(stepNames.self);
    renderWithProviders(<BaseAssessmentView><div>Mocked Children</div></BaseAssessmentView>, messages);
    expect(screen.getByText('Mocked Children')).toBeInTheDocument();
    expect(screen.getByText('Status Alert')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Modal Actions')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
  });
});
