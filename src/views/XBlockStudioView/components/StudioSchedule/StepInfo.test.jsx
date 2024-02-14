import { shallow } from '@edx/react-unit-test-utils';

import StepInfo from './StepInfo';

jest.mock('./FormatDateTime', () => 'FormatDateTime');

describe('<StepInfo />', () => {
  it('should render', () => {
    const wrapper = shallow(<StepInfo stepName="test" />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('should render with startDatetime and endDatetime', () => {
    const wrapper = shallow(<StepInfo stepName="test" startDatetime="2020-01-01T00:00:00Z" endDatetime="2020-01-01T00:00:00Z" />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
