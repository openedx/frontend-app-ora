import { shallow } from '@edx/react-unit-test-utils';

import { useCriteriaConfig } from 'hooks/assessment';
import AssessmentCriteria from './AssessmentCriteria';

jest.mock('hooks/assessment', () => ({
  useCriteriaConfig: jest.fn(),
}));

describe('<AssessmentCriteria />', () => {
  const props = {
    criteria: [
      {
        selectedOption: 1,
        feedback: 'Feedback 1',
      },
      {
        selectedOption: 2,
        feedback: 'Feedback 2',
      },
    ],
    overallFeedback: 'Overall Feedback',
    stepLabel: 'Step Label',
  };

  it('renders the component', () => {
    useCriteriaConfig.mockReturnValue([
      {
        name: 'Criterion Name',
        description: 'Criterion Description',
        options: {
          1: {
            label: 'Selected Option 1',
            points: 5,
          },
        },
      },
      {
        name: 'Criterion Name 2',
        description: 'Criterion Description 2',
        options: {
          2: {
            label: 'Selected Option 2',
            points: 10,
          },
        },
      },
    ]);
    const wrapper = shallow(<AssessmentCriteria {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    // one for each criteria and one for overall feedback
    expect(wrapper.instance.findByType('Feedback').length).toBe(3);
  });

  it('renders without props', () => {
    useCriteriaConfig.mockReturnValue([]);
    const wrapper = shallow(<AssessmentCriteria criteria={[]} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Feedback').length).toBe(0);
  });
});
