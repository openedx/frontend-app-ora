import { shallow } from '@edx/react-unit-test-utils';

import CriterionContainer from './index';

jest.mock('components/InfoPopover', () => 'InfoPopover');

describe('<CriterionContainer />', () => {
  const props = {
    input: <div data-testid="input">input</div>,
    feedback: <div data-testid="feedback">feedback</div>,
    criterion: {
      name: 'criterionName',
      description: 'description',
      options: [
        {
          name: 'option1',
          label: 'Option 1',
          description: 'description1',
        },
        {
          name: 'option2',
          label: 'Option 2',
          description: 'description2',
        },
      ],
    },
  };

  it('renders default', () => {
    const wrapper = shallow(<CriterionContainer {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByTestId('input').length).toBe(1);
    expect(wrapper.instance.findByTestId('feedback').length).toBe(1);
  });

  it('renders without input and feedback', () => {
    const wrapper = shallow(<CriterionContainer criterion={props.criterion} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByTestId('input').length).toBe(0);
    expect(wrapper.instance.findByTestId('feedback').length).toBe(0);
  });
});
