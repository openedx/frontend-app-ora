import { shallow } from '@edx/react-unit-test-utils';

import XBlockStudioView from './index';

jest.mock('./components/XBlockStudioViewProvider', () => 'XBlockStudioViewProvider');
jest.mock('./components/StudioSchedule', () => 'StudioSchedule');
jest.mock('./components/StudioViewSteps', () => 'StudioViewSteps');
jest.mock('./components/StudioViewSettings', () => 'StudioViewSettings');
jest.mock('./components/StudioViewRubric', () => 'StudioViewRubric');
jest.mock('./components/StudioViewTitle', () => 'StudioViewTitle');
jest.mock('./components/StudioViewPrompt', () => 'StudioViewPrompt');

describe('<XBlockStudioView />', () => {
  it('should render', () => {
    const wrapper = shallow(<XBlockStudioView />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('XBlockStudioViewProvider').length).toBe(1);
    expect(wrapper.instance.findByType('StudioSchedule').length).toBe(1);
    expect(wrapper.instance.findByType('StudioViewSteps').length).toBe(1);
    expect(wrapper.instance.findByType('StudioViewSettings').length).toBe(1);
    expect(wrapper.instance.findByType('StudioViewRubric').length).toBe(1);
    expect(wrapper.instance.findByType('StudioViewTitle').length).toBe(1);
    expect(wrapper.instance.findByType('StudioViewPrompt').length).toBe(1);
  });
});
