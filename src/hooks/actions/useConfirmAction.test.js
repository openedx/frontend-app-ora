import React from 'react';
import useConfirmAction from './useConfirmAction';

const config = {
  title: 'test-title',
  description: 'test-description',
  action: {
    onClick: jest.fn(),
    labels: { default: 'test-label' },
  },
};

const noLabelConfig = {
  ...config,
  action: { onClick: jest.fn(), children: 'test action children' },
};

const nestedActionConfig = {
  ...config,
  action: { action: config.action },
};

const validateBeforeOpen = jest.fn(() => true);

let out;
describe('useConfirmAction', () => {
  let setStateSpy;
  const setValue = jest.fn();

  beforeEach(() => {
    setStateSpy = jest.spyOn(React, 'useState').mockImplementation((value) => [value, setValue]);
  });

  afterEach(() => {
    setStateSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('behavior', () => {
    it('initializes isOpen state to false', () => {
      useConfirmAction(validateBeforeOpen);
      expect(setStateSpy).toHaveBeenCalledWith(false); // isOpen initial state
    });
  });
  describe('output callback', () => {
    let prereqs;
    const testClose = (closeFn) => {
      expect(closeFn.useCallback.prereqs).toEqual([setValue]);
      closeFn.useCallback.cb();
      expect(setStateSpy).toHaveBeenCalledWith(false); // isOpen set to false
    };
    const testOpen = (openFn) => {
      expect(openFn.useCallback.prereqs).toEqual([setValue, validateBeforeOpen]);
      openFn.useCallback.cb();
      expect(setValue).toHaveBeenCalledWith(true); // isOpen set to true
    };
    describe('prereqs', () => {
      beforeEach(() => {
        out = useConfirmAction(validateBeforeOpen);
        ({ prereqs } = out.useCallback);
      });
      test('close callback', () => {
        testClose(prereqs[0]);
      });
      test('isOpen value', () => {
        expect(out.useCallback.prereqs[1]).toEqual(false);
        setStateSpy.mockImplementation(() => [true, setValue]);
        out = useConfirmAction();
        expect(out.useCallback.prereqs[1]).toEqual(true);
      });
      test('open callback', () => {
        out = useConfirmAction(validateBeforeOpen);
        testOpen(prereqs[2]);
      });
    });
    describe('callback', () => {
      it('returns action with labels from config action', () => {
        out = useConfirmAction(validateBeforeOpen).useCallback.cb(config);
        testOpen(out.action.onClick);
        expect(out.action.children).toEqual(config.action.labels.default);
        expect(out.confirmProps.isOpen).toEqual(false);
        expect(out.confirmProps.title).toEqual(config.title);
        expect(out.confirmProps.description).toEqual(config.description);
        expect(out.confirmProps.action).toEqual(config.action);
        testClose(out.confirmProps.close);
      });
      it('returns nested action from config action', () => {
        out = useConfirmAction(validateBeforeOpen).useCallback.cb(nestedActionConfig);
        testOpen(out.action.onClick);
        expect(out.action.children).toEqual(nestedActionConfig.action.action.labels.default);
        expect(out.confirmProps.isOpen).toEqual(false);
        expect(out.confirmProps.title).toEqual(nestedActionConfig.title);
        expect(out.confirmProps.description).toEqual(nestedActionConfig.description);
        expect(out.confirmProps.action).toEqual(nestedActionConfig.action.action);
        testClose(out.confirmProps.close);
      });
      it('returns action with children from config action', () => {
        setStateSpy.mockImplementation(() => [true, setValue]);
        out = useConfirmAction(validateBeforeOpen).useCallback.cb(noLabelConfig);
        testOpen(out.action.onClick);
        expect(out.action.children).toEqual(noLabelConfig.action.children);
        expect(out.confirmProps.isOpen).toEqual(true);
        expect(out.confirmProps.title).toEqual(noLabelConfig.title);
        expect(out.confirmProps.description).toEqual(noLabelConfig.description);
        expect(out.confirmProps.action).toEqual(noLabelConfig.action);
        testClose(out.confirmProps.close);
      });
    });
  });
});
