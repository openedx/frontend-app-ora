import { shallow } from '@edx/react-unit-test-utils';

import LatexPreview from './LaTexPreview';

describe('<LatexPreview />', () => {
  it('renders', () => {
    const wrapper = shallow(<LatexPreview latexValue="some latext value" />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
