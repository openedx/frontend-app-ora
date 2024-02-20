import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import { renderMathJax } from 'utils/index';

import { useSubmissionConfig } from 'hooks/app';

import TextResponse from './index';

jest.mock('hooks/app', () => ({
  useSubmissionConfig: jest.fn(),
}));
jest.mock('utils/index', () => ({
  renderMathJax: jest.fn(),
}));

describe('<TextResponse />', () => {
  beforeEach(() => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { editorType: 'text', allowLatexPreview: true },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('render default', () => {
    const wrapper = shallow(<TextResponse response="response" />);
    expect(wrapper.snapshot).toMatchSnapshot();

    React.useEffect.mock.calls[0][0]();
    expect(renderMathJax).toHaveBeenCalled();
  });

  it('render without allowLatexPreview', () => {
    useSubmissionConfig.mockReturnValue({
      textResponseConfig: { editorType: 'text' },
    });
    const wrapper = shallow(<TextResponse response="response" />);
    expect(wrapper.snapshot).toMatchSnapshot();

    React.useEffect.mock.calls[0][0]();
    expect(renderMathJax).not.toHaveBeenCalled();
  });

  it('render without textResponseConfig', () => {
    useSubmissionConfig.mockReturnValue({});
    const wrapper = shallow(<TextResponse response="response" />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
