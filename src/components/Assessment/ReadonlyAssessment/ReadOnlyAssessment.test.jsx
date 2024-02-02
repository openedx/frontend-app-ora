import { shallow } from '@edx/react-unit-test-utils';

import ReadOnlyAssessment from './ReadOnlyAssessment';

jest.mock('./CollapsibleAssessment', () => 'CollapsibleAssessment');
jest.mock('./AssessmentCriteria', () => 'AssessmentCriteria');

describe('<ReadOnlyAssessment />', () => {
  let props = {
    assessment: {
      abc: 'def',
    },
    step: 'Step',
    stepScore: {
      earned: 5,
      total: 10,
    },
  };

  it('render with assessment', () => {
    const wrapper = shallow(<ReadOnlyAssessment {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('AssessmentCriteria').length).toBe(1);
  });

  it('render with assessments', () => {
    const assessments = [
      {
        abc: 'def',
      },
      {
        ghi: 'jkl',
      },
    ];
    const wrapper = shallow(<ReadOnlyAssessment {...props} assessments={assessments} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('AssessmentCriteria').length).toBe(2);
  });

  it('renders without props', () => {
    const wrapper = shallow(<ReadOnlyAssessment />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});