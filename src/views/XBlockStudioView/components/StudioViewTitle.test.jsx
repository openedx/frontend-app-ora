import { shallow } from '@edx/react-unit-test-utils';

import { useORAConfigData } from 'hooks/app';

import { useXBlockStudioViewContext } from './XBlockStudioViewProvider';
import messages from './messages';

import StudioViewTitle from './StudioViewTitle';

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('./XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: jest.fn(),
}));

describe('<StudioViewTitle />', () => {
  const mockIsAllClosed = jest.fn().mockName('isAllClosed');
  useXBlockStudioViewContext.mockReturnValue({
    isAllClosed: mockIsAllClosed,
    toggleAll: jest.fn().mockName('toggleAll'),
  });
  useORAConfigData.mockReturnValue({
    title: 'Test Title',
  });

  it('render title and button', () => {
    mockIsAllClosed.mockReturnValue(true);

    const wrapper = shallow(<StudioViewTitle />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Button')[0].children[0].el).toBe(messages.expandAllButton.defaultMessage);
  });

  it('render when all is not closed', () => {
    mockIsAllClosed.mockReturnValue(false);

    const wrapper = shallow(<StudioViewTitle />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Button')[0].children[0].el).toBe(messages.collapseAllButton.defaultMessage);
  });
});
