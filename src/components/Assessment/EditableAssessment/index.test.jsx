import { shallow } from '@edx/react-unit-test-utils';

import EditableAssessment from '.';

import { useCriteriaConfig } from 'hooks/assessment';

jest.mock('hooks/assessment', () => ({
  useCriteriaConfig: jest.fn(),
}));

jest.mock('components/CriterionContainer', () => 'CriterionContainer');
jest.mock('components/CriterionContainer/RadioCriterion', () => 'RadioCriterion');
jest.mock('components/CriterionContainer/CriterionFeedback', () => 'CriterionFeedback');
jest.mock('./OverallFeedback', () => 'OverallFeedback');
jest.mock('./AssessmentActions', () => 'AssessmentActions');

describe('<EditableAssessment />', () => {
  it('render empty criteria', () => {
    useCriteriaConfig.mockReturnValue([]);
    const wrapper = shallow(<EditableAssessment />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('CriterionContainer')).toHaveLength(0);
  });

  it('render with criteria', () => {
    const mockCriteria = [
      { name: 'criterion1' },
      { name: 'criterion2' },
      { name: 'criterion3' },
    ];
    useCriteriaConfig.mockReturnValue(mockCriteria);
    const wrapper = shallow(<EditableAssessment />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('CriterionContainer')).toHaveLength(mockCriteria.length);
  });
});