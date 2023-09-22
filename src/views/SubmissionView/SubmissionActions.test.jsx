import { shallow } from '@edx/react-unit-test-utils';
import SubmissionActions from './SubmissionActions';

describe('<SubmissionActions />', () => {
  const props = {
    submitResponseHandler: jest.fn().mockName('submitResponseHandler'),
    submitResponseStatus: 'idle',
    saveResponseHandler: jest.fn().mockName('saveResponseHandler'),
    saveResponseStatus: 'idle',
  };

  it('renders', () => {
    const wrapper = shallow(<SubmissionActions {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
