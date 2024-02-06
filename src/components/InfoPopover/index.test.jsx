import { shallow } from '@edx/react-unit-test-utils';

import InfoPopover from './index';

describe('<InfoPopover />', () => {
  const props = {
    onClick: jest.fn().mockName('onClick'),
  };

  const renderComponent = () =>
    shallow(
      <InfoPopover {...props}>
        <div>Children</div>
      </InfoPopover>
    );

  it('renders correctly', () => {
    const wrapper = renderComponent();
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
