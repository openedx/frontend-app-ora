import { when } from 'jest-when';
import eventTypes from 'constants/eventTypes';
import { useViewUrl } from 'data/services/lms/urls';
import { debug } from 'utils';

import { useRefreshPageData } from './app';
import * as hooks from './modal';

jest.mock('data/services/lms/urls', () => ({
  useViewUrl: jest.fn(),
}));
jest.mock('./app', () => ({
  useRefreshPageData: jest.fn(),
}));

jest.mock('utils', () => ({
  debug: jest.fn(),
}));

const postMessage = jest.fn();
const viewUrl = jest.fn().mockImplementation((view) => ({ view: `view-url-${view}` }));
when(useViewUrl).calledWith().mockReturnValue(viewUrl);
const refreshPageData = jest.fn();
when(useRefreshPageData).calledWith().mockReturnValue(refreshPageData);

let cb;
let out;
describe('Modal hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'parent', { value: { postMessage }, writable: true });
    process.env.BASE_URL = 'test-base-url';
  });
  describe('useCloseModal', () => {
    it('should call debug if there is no referrer', () => {
      Object.defineProperty(document, 'referrer', { value: '', writable: true });
      cb = hooks.useCloseModal();
      cb();
      expect(debug).toHaveBeenCalled();
    });
    it('should post modalClose events to * if there is a referrer', () => {
      Object.defineProperty(document, 'referrer', { value: 'test-referrer', writable: true });
      cb = hooks.useCloseModal();
      cb();
      expect(debug).not.toHaveBeenCalled();
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
  describe('useHandleModalClose', () => {
    beforeEach(() => {
      out = hooks.useHandleModalCloseEvent();
    });
    it('loads refreshPageData from hook', () => {
      expect(useRefreshPageData).toHaveBeenCalled();
    });
    describe('returned callback', () => {
      it('calls refreshPageData on event type modalClose', () => {
        out.useCallback.cb({ data: { type: eventTypes.modalClose } });
        expect(refreshPageData).toHaveBeenCalled();
      });
      it('does not call refreshPageData on other event types', () => {
        out.useCallback.cb({ data: { type: 'test-type' } });
        expect(refreshPageData).not.toHaveBeenCalled();
      });
      it('depends on refreshPageData', () => {
        expect(out.useCallback.prereqs).toEqual([refreshPageData]);
      });
    });
  });
});
