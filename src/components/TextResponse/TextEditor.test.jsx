import { shallow } from '@edx/react-unit-test-utils';
import TextEditor from './TextEditor';


describe('<TextEditor />', () => {
  const props = {
    optional: true,
    disabled: false,
    value: 'value',
    onChange: jest.fn().mockName('onChange'),
  };

  it('render optional', () => {
    const wrapper = shallow(<TextEditor {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('TextArea')[0].props.label).toContain('Optional');
  });

  it('render required', () => {
    const wrapper = shallow(<TextEditor {...props} optional={false} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('TextArea')[0].props.label).toContain('Required');
  });
});
