import { shallow } from '@edx/react-unit-test-utils';
import {
  useIsPageDataLoaded,
  useIsORAConfigLoaded,
  usePageDataError,
  useORAConfigDataError,
} from 'hooks/app';
import AppContainer from '.';

jest.mock('hooks/app', () => ({
  useIsPageDataLoaded: jest.fn().mockReturnValue(true),
  useIsORAConfigLoaded: jest.fn().mockReturnValue(true),
  usePageDataError: jest.fn().mockReturnValue(null),
  useORAConfigDataError: jest.fn().mockReturnValue(null),
}));

describe('<AppContainer />', () => {
  const props = {
    children: <div>children</div>,
  };

  it('render default', () => {
    const wrapper = shallow(<AppContainer {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Spinner')).toHaveLength(0);
  });

  describe('render error', () => {
    it('pageDataError', () => {
      usePageDataError.mockReturnValueOnce({ response: { data: { error: { errorCode: 'error' } } } });
      const wrapper = shallow(<AppContainer {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.findByType('ErrorPage')).toHaveLength(1);
    });

    it('oraConfigDataError', () => {
      useORAConfigDataError.mockReturnValueOnce({ response: { data: { error: { errorCode: 'error' } } } });
      const wrapper = shallow(<AppContainer {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.findByType('ErrorPage')).toHaveLength(1);
    });
  });

  describe('render loading', () => {
    it('isPageDataLoaded', () => {
      useIsPageDataLoaded.mockReturnValueOnce(false);
      const wrapper = shallow(<AppContainer {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.findByType('Spinner')).toHaveLength(1);
    });

    it('isORAConfigLoaded', () => {
      useIsORAConfigLoaded.mockReturnValueOnce(false);
      const wrapper = shallow(<AppContainer {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.findByType('Spinner')).toHaveLength(1);
    });
  });
});
