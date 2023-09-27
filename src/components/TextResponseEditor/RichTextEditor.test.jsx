import { shallow } from '@edx/react-unit-test-utils';
import RichTextEditor from './RichTextEditor';

jest.mock('@tinymce/tinymce-react', () => ({
  Editor: () => 'Editor',
}));

jest.mock('tinymce/tinymce.min', () => 'tinymce');
jest.mock('tinymce/icons/default', () => 'default');
jest.mock('tinymce/plugins/link', () => 'link');
jest.mock('tinymce/plugins/lists', () => 'lists');
jest.mock('tinymce/plugins/code', () => 'code');
jest.mock('tinymce/plugins/image', () => 'image');
jest.mock('tinymce/themes/silver', () => 'silver');

describe('<RichTextEditor />', () => {
  const props = {
    optional: true,
    disabled: false,
    value: 'value',
    onChange: jest.fn().mockName('onChange'),
  };

  it('render optional', () => {
    const wrapper = shallow(<RichTextEditor {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('label')[0].el.children).toContain('Optional');
    expect(wrapper.instance.findByType('Editor')[0].props.init.readonly).not.toEqual(1);
  });

  it('render required', () => {
    const wrapper = shallow(<RichTextEditor {...props} optional={false} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('label')[0].el.children).toContain('Required');
  });

  it('render disabled', () => {
    const wrapper = shallow(<RichTextEditor {...props} disabled />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('Editor')[0].props.init.readonly).toEqual(1);
  });
});
