import { shallow } from '@edx/react-unit-test-utils';

import {
  usePrompts,
  useSubmissionConfig,
} from 'hooks/app';

import SubmissionPrompts from './SubmissionPrompts';

jest.mock('hooks/app', () => ({
  usePrompts: jest.fn(),
  useSubmissionConfig: jest.fn(),
}));
jest.mock('components/Prompt', () => 'Prompt');
jest.mock('components/TextResponse', () => 'TextResponse');
jest.mock('./TextResponseEditor', () => 'TextResponseEditor');

describe('<SubmissionPrompts />', () => {
  it('render text response editor when readOnly is false', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useSubmissionConfig.mockReturnValue({ textResponseConfig: { enabled: true } });

    const wrapper = shallow(
      <SubmissionPrompts
        textResponses={['response1', 'response2']}
        onUpdateTextResponse={jest.fn()}
        isReadOnly={false}
      />,
    );

    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Prompt').length).toBe(2);
    expect(wrapper.instance.findByType('TextResponseEditor').length).toBe(2);
    expect(wrapper.instance.findByType('TextResponse').length).toBe(0);
  });

  it('render text response when readOnly is true', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useSubmissionConfig.mockReturnValue({ textResponseConfig: { enabled: true } });

    const wrapper = shallow(
      <SubmissionPrompts
        textResponses={['response1', 'response2']}
        onUpdateTextResponse={jest.fn()}
        isReadOnly
      />,
    );

    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Prompt').length).toBe(2);
    expect(wrapper.instance.findByType('TextResponseEditor').length).toBe(0);
    expect(wrapper.instance.findByType('TextResponse').length).toBe(2);
  });

  it('render empty prompts', () => {
    usePrompts.mockReturnValue([]);
    useSubmissionConfig.mockReturnValue({ textResponseConfig: { enabled: true } });

    const wrapper = shallow(
      <SubmissionPrompts
        textResponses={['response1', 'response2']}
        onUpdateTextResponse={jest.fn()}
        isReadOnly
      />,
    );

    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Prompt').length).toBe(0);
  });

  it('do not render response when textResponseConfig is disabled', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useSubmissionConfig.mockReturnValue({ textResponseConfig: { enabled: false } });

    const wrapper = shallow(
      <SubmissionPrompts
        textResponses={['response1', 'response2']}
        onUpdateTextResponse={jest.fn()}
        isReadOnly
      />,
    );

    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('Prompt').length).toBe(2);
    expect(wrapper.instance.findByType('TextResponseEditor').length).toBe(0);
    expect(wrapper.instance.findByType('TextResponse').length).toBe(0);
  });
});
