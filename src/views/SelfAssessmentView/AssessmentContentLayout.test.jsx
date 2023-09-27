import { shallow } from '@edx/react-unit-test-utils';
import AssessmentContentLayout from './AssessmentContentLayout';

jest.mock('components/Rubric', () => 'Rubric');
jest.mock('./AssessmentContent', () => 'AssessmentContent');
jest.mock('./AssessmentStatus', () => 'AssessmentStatus');

describe('<AssessmentContentLayout />', () => {
  const props = {
    submission: 'submission',
    oraConfigData: {
      assessmentSteps: {
        settings: {
          self: {
            endTime: 'endTime',
          },
        },
      },
    },
  };

  it('render', () => {
    const wrapper = shallow(<AssessmentContentLayout {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Rubric')).toHaveLength(1);
  });
});
