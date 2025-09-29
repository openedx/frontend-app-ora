import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useCriteriaConfig } from 'hooks/assessment';
import EditableAssessment from '.';

jest.mock('hooks/assessment', () => ({
  useCriteriaConfig: jest.fn(),
}));

jest.mock('components/CriterionContainer', () => () => (
  <div>Criterion Container</div>
));
jest.mock('./OverallFeedback', () => () => (
  <section aria-label="Overall Feedback">Overall Feedback</section>
));
jest.mock('./AssessmentActions', () => () => (
  <div role="group" aria-label="Assessment Actions">Assessment Actions</div>
));

const messages = {
  'frontend-app-ora.EditableAssessment.rubric': 'Rubric',
};

describe('<EditableAssessment />', () => {
  const renderWithIntl = (component) => render(
    <IntlProvider locale="en" messages={messages}>
      {component}
    </IntlProvider>,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders assessment card structure with all core components', () => {
    useCriteriaConfig.mockReturnValue([]);

    renderWithIntl(<EditableAssessment />);

    expect(screen.getByText('Rubric')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Overall Feedback' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Assessment Actions' })).toBeInTheDocument();
  });

  it('renders criterion containers based on criteria config', () => {
    const mockCriteria = [
      { name: 'criterion1' },
      { name: 'criterion2' },
    ];
    useCriteriaConfig.mockReturnValue(mockCriteria);

    renderWithIntl(<EditableAssessment />);

    expect(screen.getByText('Rubric')).toBeInTheDocument();
    expect(screen.getAllByText('Criterion Container')).toHaveLength(2);
    expect(screen.getByRole('region', { name: 'Overall Feedback' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Assessment Actions' })).toBeInTheDocument();
  });
});
