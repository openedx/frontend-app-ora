import { shallow } from '@edx/react-unit-test-utils';

import { useActiveStepName, useORAConfigData } from 'hooks/app';
import { useViewStep } from 'hooks/routing';

import Prompt from './index';

jest.mock('hooks/app', () => ({
  useActiveStepName: jest.fn(),
  useORAConfigData: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));

describe('<Prompt />', () => {
  const props = {
    prompt: 'prompt',
    title: 'title',
  };

  useActiveStepName.mockReturnValue('activeStepName');
  useORAConfigData.mockReturnValue({ baseAssetUrl: 'baseAssetUrl/' });
  useViewStep.mockReturnValue('viewStep');

  it('render default', () => {
    const wrapper = shallow(<Prompt {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    // if open and onToggle are not passed, defaultOpen should be true
    expect(wrapper.instance.findByType('Collapsible')[0].props.defaultOpen).toBe(true);
  });

  it('render with open and onToggle', () => {
    const wrapper = shallow(<Prompt {...props} open onToggle={() => {}} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    // if open and onToggle are passed, open and onToggle should be passed to Collapsible
    expect(wrapper.instance.findByType('Collapsible')[0].props.open).toBe(true);
    expect(wrapper.instance.findByType('Collapsible')[0].props.onToggle).toBeInstanceOf(Function);
    expect(wrapper.instance.findByType('Collapsible')[0].props.defaultOpen).toBe(undefined);
  });

  it('render without title', () => {
    const wrapper = shallow(<Prompt {...props} title={null} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  describe('test prompt', () => {
    const getPromptHtml = (prompt) => {
      const wrapper = shallow(<Prompt {...props} prompt={prompt} />);
      // eslint-disable-next-line no-underscore-dangle
      return wrapper.instance.findByType('div')[0].props.dangerouslySetInnerHTML.__html;
    };
    const abitraryEndpoint = '/abc/def/ghi';
    const fullAssetUrl = `http://localhost:18000/asset-v1${abitraryEndpoint}`;
    const fullStaticAssetUrl = `http://localhost:18000/baseAssetUrl${abitraryEndpoint}`;
    const relativeAssetUrl = `/asset-v1${abitraryEndpoint}`;
    const relativeStaticAssetUrl = `/static${abitraryEndpoint}`;

    it('does not update url for anchor and image that is not using relative url', () => {
      expect(getPromptHtml(`<img src="${fullAssetUrl}" />`)).toBe(`<img src="${fullAssetUrl}" />`);
      expect(getPromptHtml(`<a href="${fullAssetUrl}" />`)).toBe(`<a href="${fullAssetUrl}" />`);
      // ignore non image and anchor
      expect(getPromptHtml(`<object data="${relativeAssetUrl}" />`)).toBe(`<object data="${relativeAssetUrl}" />`);
    });

    it('update assets url for anchor and image', () => {
      expect(getPromptHtml(`<img src="${relativeAssetUrl}" />`)).toBe(`<img src="${fullAssetUrl}" />`);
      expect(getPromptHtml(`<a href="${relativeAssetUrl}" />`)).toBe(`<a href="${fullAssetUrl}" />`);
    });

    it('update static assets url for anchor and image', () => {
      expect(getPromptHtml(`<img src="${relativeStaticAssetUrl}" />`)).toBe(`<img src="${fullStaticAssetUrl}" />`);
      expect(getPromptHtml(`<a href="${relativeStaticAssetUrl}" />`)).toBe(`<a href="${fullStaticAssetUrl}" />`);
    });
  });
});
