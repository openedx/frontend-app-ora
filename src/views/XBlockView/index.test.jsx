import { shallow } from '@edx/react-unit-test-utils';
import {
  useORAConfigData,
  usePrompts,
  useRubricConfig,
  useGlobalState,
} from 'hooks/app';

import XBlockView from './index';

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
  usePrompts: jest.fn(),
  useRubricConfig: jest.fn(),
  useGlobalState: jest.fn(),
}));
jest.mock('components/ProgressBar', () => 'ProgressBar');
jest.mock('components/Prompt', () => 'Prompt');
jest.mock('components/Rubric', () => 'Rubric');
jest.mock('components/Instructions', () => 'Instructions');
jest.mock('components/StatusAlert', () => 'StatusAlert');
jest.mock('components/HotjarSurvey', () => 'HotjarSurvey');
jest.mock('./StatusRow', () => 'StatusRow');
jest.mock('./Actions', () => 'Actions');

describe('<XBlockView />', () => {
  it('render everything', () => {
    useORAConfigData.mockReturnValue({ title: 'title' });
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useRubricConfig.mockReturnValue({ showDuringResponse: true });
    useGlobalState.mockReturnValue({ stepIsUnavailable: false });

    const wrapper = shallow(<XBlockView />);

    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Prompt')).toHaveLength(2);
    expect(wrapper.instance.findByType('Rubric')).toHaveLength(1);
  });

  it('render everything without rubric', () => {
    useORAConfigData.mockReturnValue({ title: 'title' });
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useRubricConfig.mockReturnValue({ showDuringResponse: false });
    useGlobalState.mockReturnValue({ stepIsUnavailable: false });

    const wrapper = shallow(<XBlockView />);

    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Prompt')).toHaveLength(2);
    expect(wrapper.instance.findByType('Rubric')).toHaveLength(0);
  });

  it('does not render prompts and rubric when step is unavailable', () => {
    useORAConfigData.mockReturnValue({ title: 'title' });
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useRubricConfig.mockReturnValue({ showDuringResponse: true });
    useGlobalState.mockReturnValue({ stepIsUnavailable: true });

    const wrapper = shallow(<XBlockView />);

    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Prompt')).toHaveLength(0);
    expect(wrapper.instance.findByType('Rubric')).toHaveLength(0);
  });
});
