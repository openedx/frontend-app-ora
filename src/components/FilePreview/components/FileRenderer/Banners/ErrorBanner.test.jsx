import { shallow } from '@edx/react-unit-test-utils';

import ErrorBanner from './ErrorBanner';

describe('<ErrorBanner />', () => {
  const props = {
    headerMessage: {
      id: 'headerMessageId',
      defaultMessage: 'headerMessage',
    },
    actions: [
      {
        id: 'actionId',
        onClick: jest.fn().mockName('onClick'),
        message: {
          id: 'actionMessageId',
          defaultMessage: 'actionMessage',
        },
      },
    ],
  };

  it('renders correctly', () => {
    const wrapper = shallow(<ErrorBanner {...props}>children</ErrorBanner>);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('renders without actions', () => {
    const wrapper = shallow(<ErrorBanner headerMessage={props.headerMessage}>children</ErrorBanner>);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});