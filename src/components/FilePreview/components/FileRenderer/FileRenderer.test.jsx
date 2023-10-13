import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { FileRenderer } from './FileRenderer';
import { renderHooks, ErrorStatuses } from './hooks';

jest.mock('./FileCard', () => 'FileCard');
jest.mock('./Banners', () => ({
  ErrorBanner: () => 'ErrorBanner',
  LoadingBanner: () => 'LoadingBanner',
}));

jest.mock('./hooks', () => ({
  ...jest.requireActual('./hooks'),
  renderHooks: jest.fn(),
}));

const props = {
  file: {
    downloadUrl: 'file download url',
    name: 'filename.txt',
  },
};
describe('FileRenderer', () => {
  describe('component', () => {
    describe('snapshot', () => {
      test('isLoading, no Error', () => {
        const hookProps = {
          Renderer: () => 'Renderer',
          isLoading: true,
          errorStatus: null,
          error: null,
          rendererProps: { prop: 'hooks.rendererProps' },
        };
        renderHooks.mockReturnValueOnce(hookProps);
        const wrapper = shallow(<FileRenderer {...props} />);
        expect(wrapper.snapshot).toMatchSnapshot();

        expect(wrapper.instance.findByType('LoadingBanner')).toHaveLength(1);

        expect(wrapper.instance.findByType('ErrorBanner')).toHaveLength(0);
        expect(wrapper.instance.findByType('Renderer')).toHaveLength(1);
      });
      test('is not loading, with error', () => {
        const hookProps = {
          Renderer: () => 'Renderer',
          isLoading: false,
          errorStatus: ErrorStatuses.serverError,
          error: { prop: 'hooks.errorProps' },
          rendererProps: { prop: 'hooks.rendererProps' },
        };
        renderHooks.mockReturnValueOnce(hookProps);
        const wrapper = shallow(<FileRenderer {...props} />);
        expect(wrapper.snapshot).toMatchSnapshot();

        expect(wrapper.instance.findByType('LoadingBanner')).toHaveLength(0);

        expect(wrapper.instance.findByType('ErrorBanner')).toHaveLength(1);
        expect(wrapper.instance.findByType('Renderer')).toHaveLength(0);
      });
    });
  });
});
