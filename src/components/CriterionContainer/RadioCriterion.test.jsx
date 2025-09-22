import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from 'testUtils';

import {
  useShowValidation,
  useShowTrainingError,
  useCriterionOptionFormFields,
} from 'hooks/assessment';
import RadioCriterion from './RadioCriterion';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/assessment');

const mockMessages = {
  'frontend-app-ora.RadioCriterion.optionPoints': '{points} points',
  'frontend-app-ora.RadioCriterion.rubricSelectedError':
    'Rubric selection is required',
  'frontend-app-ora.TrainingCriterion.valid': 'Good job!',
  'frontend-app-ora.TrainingCriterion.invalid':
    'Reevaluate and select a new score',
};


describe('<RadioCriterion />', () => {
  const props = {
    criterion: {
      name: 'criterionName',
      options: [
        {
          name: 'option1',
          label: 'Option 1',
          points: 1,
        },
        {
          name: 'option2',
          label: 'Option 2',
          points: 2,
        },
      ],
    },
    criterionIndex: 0,
  };

  const defaultUseCriterionOptionFormFields = {
    value: 'abc',
    onChange: jest.fn().mockName('onChange'),
    isInvalid: false,
    trainingOptionValidity: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders radio options correctly', () => {
    useShowValidation.mockReturnValue(false);
    useShowTrainingError.mockReturnValue(false);
    useCriterionOptionFormFields.mockReturnValue(
      defaultUseCriterionOptionFormFields,
    );

    renderWithIntl(<RadioCriterion {...props} />, mockMessages);

    expect(
      screen.getByRole('radio', { name: /option 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /option 2/i }),
    ).toBeInTheDocument();

    expect(screen.getByText('1 points')).toBeInTheDocument();
    expect(screen.getByText('2 points')).toBeInTheDocument();

    expect(
      screen.queryByText('Rubric selection is required'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Good job!')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Reevaluate and select a new score'),
    ).not.toBeInTheDocument();
  });

  it('renders correctly with no options', () => {
    useShowValidation.mockReturnValue(false);
    useShowTrainingError.mockReturnValue(false);
    useCriterionOptionFormFields.mockReturnValue(
      defaultUseCriterionOptionFormFields,
    );

    renderWithIntl(<RadioCriterion criterion={{ ...props.criterion, options: [] }}
          criterionIndex={props.criterionIndex} />, mockMessages);

    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  it('renders validation error when invalid', () => {
    useShowValidation.mockReturnValue(true);
    useShowTrainingError.mockReturnValue(false);
    useCriterionOptionFormFields.mockReturnValue({
      ...defaultUseCriterionOptionFormFields,
      isInvalid: true,
    });

    renderWithIntl(<RadioCriterion {...props} />, mockMessages);

    expect(
      screen.getByRole('radio', { name: /option 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /option 2/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Rubric selection is required'),
    ).toBeInTheDocument();
  });

  it('renders training error when training is invalid', () => {
    useShowValidation.mockReturnValue(false);
    useShowTrainingError.mockReturnValue(true);
    useCriterionOptionFormFields.mockReturnValue({
      ...defaultUseCriterionOptionFormFields,
      trainingOptionValidity: 'invalid',
    });

    renderWithIntl(<RadioCriterion {...props} />, mockMessages);

    expect(
      screen.getByRole('radio', { name: /option 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /option 2/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Reevaluate and select a new score'),
    ).toBeInTheDocument();
  });

  it('renders both validation and training errors', () => {
    useShowValidation.mockReturnValue(true);
    useShowTrainingError.mockReturnValue(true);
    useCriterionOptionFormFields.mockReturnValue({
      ...defaultUseCriterionOptionFormFields,
      isInvalid: true,
      trainingOptionValidity: 'invalid',
    });

    renderWithIntl(<RadioCriterion {...props} />, mockMessages);

    expect(
      screen.getByRole('radio', { name: /option 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /option 2/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Rubric selection is required'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Reevaluate and select a new score'),
    ).toBeInTheDocument();
  });

  it('renders training success message', () => {
    useShowValidation.mockReturnValue(false);
    useShowTrainingError.mockReturnValue(true);
    useCriterionOptionFormFields.mockReturnValue({
      ...defaultUseCriterionOptionFormFields,
      trainingOptionValidity: 'valid',
    });

    renderWithIntl(<RadioCriterion {...props} />, mockMessages);

    expect(screen.getByText('Good job!')).toBeInTheDocument();
  });
});
