import eventTypes from 'constants/eventTypes';
import { useViewUrl } from 'data/services/lms/urls';
import { debug } from 'utils';

import * as hooks from './modal';

jest.mock('data/services/lms/urls', () => ({
  useViewUrl: jest.fn(),
}));

jest.mock('utils', () => ({
  debug: jest.fn(),
}));

const postMessage = jest.fn();
const viewUrl = jest.fn().mockImplementation((view) => ({ view: `view-url-${view}` }));
useViewUrl.mockReturnValue(viewUrl);

let cb;
describe('Modal hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'parent', { value: { postMessage }, writable: true });
    process.env.BASE_URL = 'test-base-url';
  });
  describe('useRefreshUpstream', () => {
    it('should call debug if there is no referrer', () => {
      Object.defineProperty(document, 'referrer', { value: '', writable: true });
      cb = hooks.useRefreshUpstream();
      cb();
      expect(debug).toHaveBeenCalled();
    });
    it('should post refresh event to base Url if there is a referrer', () => {
      Object.defineProperty(document, 'referrer', { value: 'test-referrer', writable: true });
      cb = hooks.useRefreshUpstream();
      cb();
      expect(debug).not.toHaveBeenCalled();
      expect(postMessage).toHaveBeenCalledWith({ type: eventTypes.refresh }, process.env.BASE_URL);
    });
  });
  describe('useCloseModal', () => {
    it('should call debug if there is no referrer', () => {
      Object.defineProperty(document, 'referrer', { value: '', writable: true });
      cb = hooks.useCloseModal();
      cb();
      expect(debug).toHaveBeenCalled();
    });
    it('should post refresh and modalClose events to * if there is a referrer', () => {
      Object.defineProperty(document, 'referrer', { value: 'test-referrer', writable: true });
      cb = hooks.useCloseModal();
      cb();
      expect(debug).not.toHaveBeenCalled();
      expect(postMessage).toHaveBeenCalledWith({ type: eventTypes.refresh }, '*');
      expect(postMessage).toHaveBeenCalledWith({ type: eventTypes.modalClose }, '*');
    });
  });
  describe('useOpenModal', () => {
    it('loads view url from hook', () => {
      cb = hooks.useOpenModal();
      expect(useViewUrl).toHaveBeenCalled();
    });
    it('returns callback to open fullscreen modal', () => {
      cb = hooks.useOpenModal();
      const view = 'test-view';
      const title = 'test-title';
      cb({ view, title });
      expect(postMessage).toHaveBeenCalledWith(
        {
          type: eventTypes.modalOpen,
          payload: {
            url: viewUrl({ view }),
            isFullscreen: true,
            title,
            height: hooks.modalHeight,
          },
        },
        '*',
      );
    });
  });
});
