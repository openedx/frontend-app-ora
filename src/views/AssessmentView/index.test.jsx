import { shallow } from '@edx/react-unit-test-utils';

import { useViewStep } from 'hooks/routing';

import { stepNames } from 'constants/index';
import useAssessmentData from './useAssessmentData';
import AssessmentView from './index';

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('components/Prompt', () => 'Prompt');
jest.mock('components/TextResponse', () => 'TextResponse');
jest.mock('components/FileUpload', () => 'FileUpload');
jest.mock('./useAssessmentData', () => jest.fn());

describe('<AssessmentView />', () => {
  useViewStep.mockReturnValue(stepNames.self);
  it('render empty on not loaded', () => {
    useAssessmentData.mockReturnValue({
      prompts: [],
      response: {},
      isLoaded: false,
    });
    const wrapper = shallow(<AssessmentView />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('render with prompts and text responses', () => {
    useAssessmentData.mockReturnValue({
      prompts: [
        { id: 1, prompt: 'prompt' },
        { id: 2, prompt: 'prompt' },
      ],
      response: {
        textResponses: [
          { id: 1, response: 'response' },
          { id: 2, response: 'response' },
        ],
      },
      isLoaded: true,
    });
    const wrapper = shallow(<AssessmentView />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Prompt').length).toBe(2);
    expect(wrapper.instance.findByType('TextResponse').length).toBe(2);
    expect(wrapper.instance.findByType('FileUpload').length).toBe(0);
  });

  it('render with files', () => {
    useAssessmentData.mockReturnValue({
      prompts: [],
      response: {
        uploadedFiles: [{ id: 1, name: 'file' }],
      },
      isLoaded: true,
    });
    const wrapper = shallow(<AssessmentView />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Prompt').length).toBe(0);
    expect(wrapper.instance.findByType('TextResponse').length).toBe(0);
    expect(wrapper.instance.findByType('FileUpload').length).toBe(1);
  });
});
