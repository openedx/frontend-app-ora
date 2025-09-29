import { renderWithProviders } from 'testUtils';
import '@testing-library/jest-dom';

import { useHasSubmitted } from 'hooks/app';
import { useSubmittedAssessment } from 'hooks/assessment';
import ReadOnlyAssessmentContainer from '.';

const mockRefreshPageData = jest.fn();

const mockReadOnlyMultipleAssessmentsProps = {
  assessments: [
    {
      criteria: [
        {
          selectedOption: 0,
          feedback: 'a1 - Mock feedback 1',
        },
        {
          selectedOption: 1,
          feedback: 'a1 - Mock feedback 2',
        },
      ],
      overallFeedback: 'Overall, Assessment 1 feedback!',
    },
    {
      criteria: [
        {
          selectedOption: 2,
          feedback: 'a2 - Mock feedback 1',
        },
        {
          selectedOption: 3,
          feedback: 'a2 - Mock feedback 2',
        },
      ],
      overallFeedback: 'Overall, Assessment 2 feedback!',
    },
  ],
  stepLabel: 'Mock Step Label Multiple 2',
  step: 'mock step multiple 2',
  stepScore: {
    earned: 20,
    possible: 80,
  },
  defaultOpen: true,
};

jest.mock('hooks/app', () => ({
  useHasSubmitted: jest.fn(),
  useRefreshPageData: jest.fn(() => mockRefreshPageData),
}));

jest.mock('hooks/assessment', () => ({
  useSubmittedAssessment: jest.fn(),
  useCriteriaConfig: () => ([
    {
      name: 'criterion1',
      description: 'Criterion 1 description',
      options: [
        { label: 'Excellent', points: 3 },
        { label: 'Good', points: 2 },
        { label: 'Fair', points: 1 },
      ],
    },
    {
      name: 'criterion2',
      description: 'Criterion 2 description',
      options: [
        { label: 'Yes', points: 1 },
        { label: 'No', points: 0 },
      ],
    },
  ]),
}));

describe('<ReadOnlyAssessmentContainer />', () => {
  it('renders the component and useHasSubmitted is false', () => {
    useHasSubmitted.mockReturnValue(false);
    renderWithProviders(<ReadOnlyAssessmentContainer {...mockReadOnlyMultipleAssessmentsProps} />);
    expect(mockRefreshPageData).not.toHaveBeenCalled();
  });

  it('renders the component and useHasSubmitted is true', () => {
    useHasSubmitted.mockReturnValue(true);
    renderWithProviders(<ReadOnlyAssessmentContainer {...mockReadOnlyMultipleAssessmentsProps} />);
    expect(mockRefreshPageData).toHaveBeenCalled();
  });

  it('calls useSubmittedAssessment when user has submitted', () => {
    const submittedAssessment = {
      criteria: [
        {
          selectedOption: 0,
          feedback: 'Great job on this criterion!',
        },
        {
          selectedOption: 1,
          feedback: 'Needs improvement on this part.',
        },
      ],
      overallFeedback: 'Overall, well done!',
    };
    useHasSubmitted.mockReturnValue(true);

    renderWithProviders(<ReadOnlyAssessmentContainer {...mockReadOnlyMultipleAssessmentsProps} />);
    useSubmittedAssessment.mockReturnValue(submittedAssessment);
    expect(useSubmittedAssessment).toHaveBeenCalled();
  });
});
