import { shallow } from '@edx/react-unit-test-utils';

import {
  useAssessmentData,
  useStepInfo,
} from 'hooks/app';
import { stepNames } from 'constants/index';

import FinalGrade from './FinalGrade';

jest.mock('hooks/app', () => ({
  useAssessmentData: jest.fn(),
  useStepInfo: jest.fn(),
}));
jest.mock('components/InfoPopover', () => 'InfoPopover');
jest.mock('components/Assessment/ReadonlyAssessment', () => 'ReadOnlyAssessment');

describe('<FinalGrade />', () => {
  const mockUseAssessmentData = {
    effectiveAssessmentType: stepNames.self,
    [stepNames.self]: {
      stepScore: 1,
    },
    [stepNames.peer]: {
      stepScore: 2,
    },
  };

  it('self and peer grades', () => {
    useAssessmentData.mockReturnValue(mockUseAssessmentData);
    useStepInfo.mockReturnValue({
      [stepNames.self]: true,
      [stepNames.peer]: true,
    });

    const wrapper = shallow(<FinalGrade />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ReadOnlyAssessment')).toHaveLength(2);
  });

  it('peer only', () => {
    useAssessmentData.mockReturnValue({
      effectiveAssessmentType: stepNames.peer,
      [stepNames.peer]: {
        stepScore: 2,
      },
    });
    useStepInfo.mockReturnValue({
      [stepNames.self]: false,
      [stepNames.peer]: true,
    });

    const wrapper = shallow(<FinalGrade />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ReadOnlyAssessment')).toHaveLength(1);
  });
});
