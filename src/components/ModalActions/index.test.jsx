import { shallow } from '@edx/react-unit-test-utils';

import { useIsPageDataLoading } from 'hooks/app';

import useModalActionConfig from './hooks/useModalActionConfig';

import ModalActions from './index';

jest.mock('components/ActionButton', () => 'ActionButton');
jest.mock('components/ConfirmDialog', () => 'ConfirmDialog');
jest.mock('hooks/app', () => ({
  useIsPageDataLoading: jest.fn(),
}));
jest.mock('./hooks/useModalActionConfig', () => jest.fn());

describe('<ModalActions />', () => {
  const props = {
    options: {},
  };
  beforeEach(() => {
    useIsPageDataLoading.mockReturnValue(false);
  });

  it('render skeleton when page data is loading', () => {
    useIsPageDataLoading.mockReturnValueOnce(true);
    const wrapper = shallow(<ModalActions {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Skeleton')).toHaveLength(1);
  });

  it('render empty when no actions', () => {
    useModalActionConfig.mockReturnValue({});
    const wrapper = shallow(<ModalActions {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('ActionButton')).toHaveLength(0);
    expect(wrapper.instance.findByType('ConfirmDialog')).toHaveLength(0);
  });

  it('can render primary and secondary without confirm', () => {
    useModalActionConfig.mockReturnValue({
      primary: {
        action: {},
      },
      secondary: {
        action: {},
      },
    });
    const wrapper = shallow(<ModalActions {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('ActionButton')).toHaveLength(2);
    expect(wrapper.instance.findByType('ConfirmDialog')).toHaveLength(0);
  });

  it('can render primary and secondary with confirm', () => {
    useModalActionConfig.mockReturnValue({
      primary: {
        action: {},
        confirmProps: {},
      },
      secondary: {
        action: {},
        confirmProps: {},
      },
    });
    const wrapper = shallow(<ModalActions {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('ActionButton')).toHaveLength(2);
    expect(wrapper.instance.findByType('ConfirmDialog')).toHaveLength(2);
  });
});
