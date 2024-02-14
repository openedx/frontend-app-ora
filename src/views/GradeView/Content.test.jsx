import { shallow } from '@edx/react-unit-test-utils';

import { usePrompts, useResponseData, useEffectiveGradeStep } from 'hooks/app';
import { stepNames } from 'constants/index';

import Content from './Content';

jest.mock('hooks/app', () => ({
  usePrompts: jest.fn(),
  useResponseData: jest.fn(),
  useEffectiveGradeStep: jest.fn(),
}));
jest.mock('components/FileUpload', () => 'FileUpload');
jest.mock('components/Prompt', () => 'Prompt');
jest.mock('components/TextResponse', () => 'TextResponse');

describe('<Content />', () => {
  it('render without prompt and effectiveGradeStep is not peer', () => {
    usePrompts.mockReturnValue([]);
    useResponseData.mockReturnValue({ textResponses: [], uploadedFiles: [] });
    useEffectiveGradeStep.mockReturnValue(stepNames.self);
    const wrapper = shallow(<Content />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render with prompt, textResponse and effectiveGradeStep is peer', () => {
    usePrompts.mockReturnValue(['prompt1', 'prompt2']);
    useResponseData.mockReturnValue({
      textResponses: ['text response 1', 'text response 2'],
      uploadedFiles: ['upload'],
    });
    useEffectiveGradeStep.mockReturnValue(stepNames.peer);
    const wrapper = shallow(<Content />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
