import { shallow } from '@edx/react-unit-test-utils';
import AssessmentContentLayout from './AssessmentContentLayout';

jest.mock('components/Rubric', () => 'Rubric');
jest.mock('./AssessmentContent', () => 'AssessmentContent');

describe('<AssessmentContentLayout />', () => {
  const props = {
    submission: 'submission'
  };

  it('render', () => {
    const wrapper = shallow(<AssessmentContentLayout {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Rubric')).toHaveLength(1);
  });
});
