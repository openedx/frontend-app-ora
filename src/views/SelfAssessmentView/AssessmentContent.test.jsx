import { shallow } from '@edx/react-unit-test-utils';
import AssessmentContent from './AssessmentContent';

jest.mock('@edx/paragon/icons', () => ({
  CheckCircle: 'CheckCircle',
}));

jest.mock('components/Prompt', () => 'Prompt');
jest.mock('components/TextResponse', () => 'TextResponse');
jest.mock('components/FileUpload', () => 'FileUpload');

describe('<AssessmentContent />', () => {
  const props = {
    submission: {
      response: {
        textResponses: ['test'],
        uploadedFiles: [{
          fileDescription: 'test',
        }],
      },
    },
    oraConfigData: {
      prompts: ['<p>test</p>'],
      submissionConfig: {
        maxFileSize: 100,
      },
    },
  };

  describe('render', () => {
    test('default', () => {
      const wrapper = shallow(<AssessmentContent {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Prompt')).toHaveLength(1);
    });

    test('no prompts', () => {
      const wrapper = shallow(<AssessmentContent {...props} oraConfigData={{ prompts: [] }} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Prompt')).toHaveLength(0);
    });
  });
});
