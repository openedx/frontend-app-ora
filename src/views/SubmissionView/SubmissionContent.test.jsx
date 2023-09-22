import { shallow } from '@edx/react-unit-test-utils';
import SubmissionContent from './SubmissionContent';

jest.mock('@edx/paragon/icons', () => ({
  CheckCircle: 'CheckCircle',
}));

jest.mock('components/Prompt', () => 'Prompt');
jest.mock('components/TextResponse', () => 'TextResponse');
jest.mock('components/FileUpload', () => 'FileUpload');

describe('<SubmissionContent />', () => {
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
    onTextResponseChange: jest.fn().mockName('onTextResponseChange'),
    onFileUploaded: jest.fn().mockName('onFileUploaded'),
    draftSaved: true,
  };

  describe('render', () => {
    test('default', () => {
      const wrapper = shallow(<SubmissionContent {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Prompt')).toHaveLength(1);
    });

    test('no prompts', () => {
      const wrapper = shallow(<SubmissionContent {...props} oraConfigData={{ prompts: [] }} />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType('Prompt')).toHaveLength(0);
    });
  });

});
