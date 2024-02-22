import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import { renderMathJax } from 'utils/index';

import LatexPreview from './LaTexPreview';

jest.mock('utils/index', () => ({
  renderMathJax: jest.fn(),
}));

describe('<LatexPreview />', () => {
  it('renders', () => {
    const wrapper = shallow(<LatexPreview latexValue="some latext value" />);
    expect(wrapper.snapshot).toMatchSnapshot();

    React.useEffect.mock.calls[0][0]();
    expect(renderMathJax).toHaveBeenCalled();
  });
});
