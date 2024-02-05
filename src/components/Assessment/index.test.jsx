import { shallow } from '@edx/react-unit-test-utils';

import Assessment from './index';

import { useAssessmentData } from './useAssessmentData';

jest.mock('./useAssessmentData', () => ({
  useAssessmentData: jest.fn(),
}));

jest.mock('./EditableAssessment', () => 'EditableAssessment');
jest.mock('./ReadonlyAssessment', () => 'ReadonlyAssessment');

describe('<Assessment />', () => {
  it('renders the ReadonlyAssessment', () => {
    useAssessmentData.mockReturnValue({ initialized: true, hasSubmitted: true });
    const wrapper = shallow(<Assessment />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ReadonlyAssessment')).toHaveLength(1);
    expect(wrapper.instance.findByType('EditableAssessment')).toHaveLength(0);
  });
  it('renders the EditableAssessment', () => {
    useAssessmentData.mockReturnValue({ initialized: true, hasSubmitted: false });
    const wrapper = shallow(<Assessment />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ReadonlyAssessment')).toHaveLength(0);
    expect(wrapper.instance.findByType('EditableAssessment')).toHaveLength(1);
  });
  it('renders nothing if not initialized', () => {
    useAssessmentData.mockReturnValue({ initialized: false });
    const wrapper = shallow(<Assessment />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
