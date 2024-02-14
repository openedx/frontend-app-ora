import { shallow } from '@edx/react-unit-test-utils';

import { usePrompts } from 'hooks/app';

import StudioViewPrompt from './StudioViewPrompt';

jest.mock('hooks/app', () => ({
  usePrompts: jest.fn(),
}));
jest.mock('./XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    promptIsOpen: true,
    togglePrompt: jest.fn().mockName('togglePrompt'),
  }),
}));
jest.mock('components/Prompt', () => 'Prompt');

describe('<StudioViewPrompt />', () => {
  it('render with prompt', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);

    const wrapper = shallow(<StudioViewPrompt />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Prompt')).toHaveLength(2);
  });

  it('render without prompt', () => {
    usePrompts.mockReturnValue([]);

    const wrapper = shallow(<StudioViewPrompt />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Prompt')).toHaveLength(0);
  });
});
