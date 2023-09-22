import { shallow } from '@edx/react-unit-test-utils';
import SubmissionContentLayout from './SubmissionContentLayout';

jest.mock('components/Rubric', () => 'Rubric');
jest.mock('./SubmissionContent', () => 'SubmissionContent');

describe('<SubmissionContentLayout />', () => {
  const props = {
    submission: 'submission',
    oraConfigData: {
      showDuringResponse: true,
    },
    onTextResponseChange: jest.fn().mockName('onTextResponseChange'),
    onFileUploaded: jest.fn().mockName('onFileUploaded'),
    draftSaved: true,
  };

  it('show rubric', () => {
    const wrapper = shallow(<SubmissionContentLayout {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Rubric')).toHaveLength(1);
  });

  it('hide rubric', () => {
    const wrapper = shallow(<SubmissionContentLayout {...props} oraConfigData={{ showDuringResponse: false }} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Rubric')).toHaveLength(0);
  });
});
