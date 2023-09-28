import { shallow } from '@edx/react-unit-test-utils';
import { AssessmentView } from '.';

jest.mock('./AssessmentContentLayout', () => 'AssessmentContentLayout');

jest.mock('./hooks', () => jest.fn().mockReturnValue({
  submission: 'submission',
  oraConfigData: 'oraConfigData',
}));

describe('<AssessmentView />', () => {
  it('renders', () => {
    const wrapper = shallow(<AssessmentView />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
