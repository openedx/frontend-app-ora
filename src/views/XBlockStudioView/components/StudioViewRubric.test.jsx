import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useRubricConfig } from 'hooks/app';

import StudioViewRubric from './StudioViewRubric';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useRubricConfig: jest.fn(),
}));
jest.mock('./XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    rubricIsOpen: true,
    toggleRubric: jest.fn(),
  }),
}));

describe('<StudioViewRubric />', () => {
  const renderWithIntl = (component) => render(<IntlProvider locale="en">{component}</IntlProvider>);

  const sampleCriteria = [
    {
      name: 'criterion1',
      description: 'description1',
      options: [
        {
          name: 'option1',
          label: 'label1',
          points: 1,
          description: 'description1',
        },
        {
          name: 'option2',
          label: 'label2',
          points: 2,
          description: 'description2',
        },
      ],
    },
    {
      name: 'criterion2',
      description: 'description2',
      options: [
        {
          name: 'option3',
          label: 'label3',
          points: 3,
          description: 'description3',
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders rubric with criteria and options', () => {
    useRubricConfig.mockReturnValue({
      criteria: sampleCriteria,
    });

    renderWithIntl(<StudioViewRubric />);

    expect(screen.getByText('Rubric')).toBeInTheDocument();
    expect(screen.getAllByTestId('criteria-test-id')).toHaveLength(2);

    expect(screen.getByText('criterion1')).toBeInTheDocument();
    expect(screen.getAllByText('description1')).toHaveLength(2);
    expect(screen.getByText('criterion2')).toBeInTheDocument();
    expect(screen.getAllByText('description2')).toHaveLength(2);
  });

  it('renders criterion options with points', () => {
    useRubricConfig.mockReturnValue({
      criteria: sampleCriteria,
    });

    renderWithIntl(<StudioViewRubric />);

    expect(screen.getByText(/label1: 1/)).toBeInTheDocument();
    expect(screen.getByText(/label2: 2/)).toBeInTheDocument();
    expect(screen.getByText(/label3: 3/)).toBeInTheDocument();
    expect(screen.getAllByText(/point/)).toHaveLength(3);
  });

  it('renders without criteria when empty', () => {
    useRubricConfig.mockReturnValue({ criteria: [] });

    renderWithIntl(<StudioViewRubric />);

    expect(screen.getByText('Rubric')).toBeInTheDocument();
    expect(screen.queryAllByTestId('criteria-test-id')).toHaveLength(0);
  });

  it('renders criterion labels correctly', () => {
    useRubricConfig.mockReturnValue({
      criteria: sampleCriteria,
    });

    renderWithIntl(<StudioViewRubric />);

    expect(screen.getAllByText('Criteria name:')).toHaveLength(2);
    expect(screen.getAllByText('Criteria description:')).toHaveLength(2);
    expect(screen.getAllByText('Criteria options:')).toHaveLength(2);
  });

  it('renders multiple criteria with different option counts', () => {
    useRubricConfig.mockReturnValue({
      criteria: sampleCriteria,
    });

    renderWithIntl(<StudioViewRubric />);

    const criteria = screen.getAllByTestId('criteria-test-id');
    expect(criteria).toHaveLength(2);

    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2);
  });
});
