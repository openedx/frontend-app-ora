import { shallow } from '@edx/react-unit-test-utils';

import useInstructionsMessage from './useInstructionsMessage';

import Instructions from './index';

jest.mock('./useInstructionsMessage', () => jest.fn());

describe('<Instructions />', () => {
  it('render empty on no message', () => {
    useInstructionsMessage.mockReturnValue(null);
    const wrapper = shallow(<Instructions />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('render message', () => {
    useInstructionsMessage.mockReturnValue('arbitrarilyInstructionsMessage');
    const wrapper = shallow(<Instructions />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
