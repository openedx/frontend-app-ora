import { shallow } from '@edx/react-unit-test-utils';

import GradeView from './index';

jest.mock('components/ModalActions', () => 'ModalActions');
jest.mock('./FinalGrade', () => 'FinalGrade');
jest.mock('./Content', () => 'Content');

describe('<GradeView />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GradeView />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ModalActions')).toHaveLength(1);
    expect(wrapper.instance.findByType('FinalGrade')).toHaveLength(1);
    expect(wrapper.instance.findByType('Content')).toHaveLength(1);
  });
});
