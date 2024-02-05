import { shallow } from '@edx/react-unit-test-utils';

import {
  useShowValidation,
  useShowTrainingError,
  useCriterionOptionFormFields,
} from 'hooks/assessment';
import RadioCriterion from './RadioCriterion';

jest.mock('hooks/assessment');

describe('<RadioCriterion />', () => {
  const props = {
    criterion: {
      name: 'criterionName',
      options: [
        {
          name: 'option1',
          label: 'Option 1',
          points: 1,
        },
        {
          name: 'option2',
          label: 'Option 2',
          points: 2,
        },
      ],
    },
    criterionIndex: 0,
  };

  const defaultUseCriterionOptionFormFields = {
    value: 'abc',
    onChange: jest.fn().mockName('onChange'),
    isInvalid: false,
    trainingOptionValidity: '',
  };

  it('renders correctly', () => {
    useShowValidation.mockReturnValueOnce(false);
    useShowTrainingError.mockReturnValueOnce(false);
    useCriterionOptionFormFields.mockReturnValueOnce(defaultUseCriterionOptionFormFields);

    const wrapper = shallow(<RadioCriterion {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Radio').length).toBe(2);
  });

  it('renders correctly with no options', () => {
    useShowValidation.mockReturnValueOnce(false);
    useShowTrainingError.mockReturnValueOnce(false);
    useCriterionOptionFormFields.mockReturnValueOnce(defaultUseCriterionOptionFormFields);

    const wrapper = shallow(
      <RadioCriterion
        criterion={{ ...props.criterion, options: [] }}
        criterionIndex={props.criterionIndex}
      />,
    );
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Radio').length).toBe(0);
  });

  it('renders correctly with validation error', () => {
    useShowValidation.mockReturnValueOnce(true);
    useShowTrainingError.mockReturnValueOnce(false);
    useCriterionOptionFormFields.mockReturnValueOnce({
      ...defaultUseCriterionOptionFormFields,
      isInvalid: true,
    });

    const wrapper = shallow(<RadioCriterion {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(1);
  });

  it('renders correctly with training error', () => {
    useShowValidation.mockReturnValueOnce(false);
    useShowTrainingError.mockReturnValueOnce(true);
    useCriterionOptionFormFields.mockReturnValueOnce({
      ...defaultUseCriterionOptionFormFields,
      trainingOptionValidity: 'invalid',
    });

    const wrapper = shallow(<RadioCriterion {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(1);
  });

  it('renders correctly with validation and training error', () => {
    useShowValidation.mockReturnValueOnce(true);
    useShowTrainingError.mockReturnValueOnce(true);
    useCriterionOptionFormFields.mockReturnValueOnce({
      ...defaultUseCriterionOptionFormFields,
      isInvalid: true,
      trainingOptionValidity: 'invalid',
    });

    const wrapper = shallow(<RadioCriterion {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Form.Control.Feedback').length).toBe(2);
  });
});
