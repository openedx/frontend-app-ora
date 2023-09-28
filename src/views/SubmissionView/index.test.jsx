import { shallow } from '@edx/react-unit-test-utils';
import { SubmissionView } from '.';

jest.mock('./SubmissionContentLayout', () => 'SubmissionContentLayout');
jest.mock('./SubmissionActions', () => 'SubmissionActions');

jest.mock('./hooks', () => jest.fn().mockReturnValue({
  submission: 'submission',
  oraConfigData: 'oraConfigData',
  onFileUploaded: jest.fn().mockName('onFileUploaded'),
  onDeletedFile: jest.fn().mockName('onDeletedFile'),
  onTextResponseChange: jest.fn().mockName('onTextResponseChange'),
  submitResponseHandler: jest.fn().mockName('submitResponseHandler'),
  submitResponseStatus: 'submitResponseStatus',
  saveResponseHandler: jest.fn().mockName('saveResponseHandler'),
  saveResponseStatus: 'saveResponseStatus',
  draftSaved: true,
}));

describe('<SubmissionView />', () => {
  it('renders', () => {
    const wrapper = shallow(<SubmissionView />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
