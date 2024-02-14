import { shallow } from '@edx/react-unit-test-utils';

import { useOverallFeedbackPrompt, useOverallFeedbackFormFields } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import OverallFeedback from '.';

jest.mock('hooks/assessment', () => ({
  useOverallFeedbackPrompt: jest.fn(),
  useOverallFeedbackFormFields: jest.fn(),
}));

jest.mock('components/InfoPopover', () => 'InfoPopover');

jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn().mockReturnValue('step'),
}));

describe('<OverallFeedback />', () => {
  const mockOnChange = jest
    .fn()
    .mockName('useOverallFeedbackFormFields.onChange');
  const mockFeedbackValue = 'useOverallFeedbackFormFields.value';
  const mockPrompt = 'useOverallFeedbackPrompt';

  beforeAll(() => {
    useOverallFeedbackPrompt.mockReturnValue(mockPrompt);
    useOverallFeedbackFormFields.mockReturnValue({
      value: mockFeedbackValue,
      onChange: mockOnChange,
    });
  });

  it('render default', () => {
    const wrapper = shallow(<OverallFeedback />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render empty on studentTraining', () => {
    useViewStep.mockReturnValueOnce(stepNames.studentTraining);
    const wrapper = shallow(<OverallFeedback />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('has correct mock value', () => {
    const wrapper = shallow(<OverallFeedback />);

    expect(wrapper.instance.findByTestId('prompt-test-id')[0].children[0].el).toBe(
      mockPrompt,
    );

    const { props } = wrapper.instance.findByType('Form.Control')[0];
    expect(props.value).toBe(mockFeedbackValue);
    expect(props.onChange).toBe(mockOnChange);
  });
});
