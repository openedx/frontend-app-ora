import { shallow } from '@edx/react-unit-test-utils';

import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';
import {
  useShowValidation,
  useCriterionFeedbackFormFields,
} from 'hooks/assessment';

import CriterionFeedback from './CriterionFeedback';

jest.mock('hooks/assessment');
jest.mock('hooks/routing');

describe('<CriterionFeedback />', () => {
  const props = {
    criterion: {
      feedbackEnabled: true,
      feedbackRequired: true,
    },
    criterionIndex: 0,
  };

  it('render empty on student training', () => {
    useViewStep.mockReturnValue(stepNames.studentTraining);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: false,
    });
    const wrapper = shallow(<CriterionFeedback {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('render empty on feedback not enable', () => {
    useViewStep.mockReturnValue(stepNames.self);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: false,
    });

    const wrapper = shallow(<CriterionFeedback {...props}  criterion={{
      feedbackEnabled: false,
      feedbackRequired: false,
    }} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('render with validation error', () => {
    useViewStep.mockReturnValue(stepNames.self);
    useShowValidation.mockReturnValue(true);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: true,
    });

    const wrapper = shallow(<CriterionFeedback {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(1);
  });

  it('render without validation error', () => {
    useViewStep.mockReturnValue(stepNames.self);
    useShowValidation.mockReturnValue(false);
    useCriterionFeedbackFormFields.mockReturnValue({
      value: '',
      onChange: jest.fn(),
      isInvalid: false,
    });

    const wrapper = shallow(<CriterionFeedback {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(0);
  });
});