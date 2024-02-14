import { shallow } from '@edx/react-unit-test-utils';

import useSubmissionViewData from './hooks';

import SubmissionView from './index';

jest.mock('components/Rubric', () => 'Rubric');
jest.mock('components/ModalActions', () => 'ModalActions');
jest.mock('components/FileUpload', () => 'FileUpload');
jest.mock('components/Instructions', () => 'Instructions');
jest.mock('components/StatusAlert', () => 'StatusAlert');
jest.mock('./SubmissionPrompts', () => 'SubmissionPrompts');
jest.mock('./hooks', () => jest.fn());

describe('<SubmissionView />', () => {
  const mockUseSubmissionViewData = {
    actionOptions: {
      hasSubmitted: false,
    },
    showRubric: false,
    response: {
      textResponses: ['response1', 'response2'],
      uploadedFiles: [],
    },
    onUpdateTextResponse: jest.fn(),
    isDraftSaved: false,
    onDeletedFile: jest.fn(),
    onFileUploaded: jest.fn(),
    isReadOnly: false,
  };
  useSubmissionViewData.mockReturnValue(mockUseSubmissionViewData);

  it('renders disable show rubric', () => {
    const wrapper = shallow(<SubmissionView />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Rubric').length).toBe(0);
  });

  it('renders enable show rubric', () => {
    mockUseSubmissionViewData.showRubric = true;
    const wrapper = shallow(<SubmissionView />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Rubric').length).toBe(1);
  });
});
