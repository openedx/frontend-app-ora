import { mockUseKeyedState } from '@edx/react-unit-test-utils';

import useConfirmAction, { stateKeys } from './useConfirmAction';

const state = mockUseKeyedState(stateKeys);

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

let out;
describe('useConfirmAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    state.mock();
    out = useConfirmAction();
  });
  afterEach(() => { state.resetVals(); });
  describe('behavior', () => {
    it('initializes isOpen state to false', () => {
      state.expectInitializedWith(stateKeys.isOpen, false);
    });
  });
  describe('output callback', () => {
    let prereqs;
    const testClose = (closeFn) => {
      expect(closeFn.useCallback.prereqs).toEqual([state.setState[stateKeys.isOpen]]);
      closeFn.useCallback.cb();
      state.expectSetStateCalledWith(stateKeys.isOpen, false);
    };
    const testOpen = (openFn) => {
      expect(openFn.useCallback.prereqs).toEqual([state.setState[stateKeys.isOpen]]);
      openFn.useCallback.cb();
      state.expectSetStateCalledWith(stateKeys.isOpen, true);
    };
    describe('prereqs', () => {
      beforeEach(() => {
        ({ prereqs } = out.useCallback);
      });
      test('close callback', () => {
        testClose(prereqs[0]);
      });
      test('isOpen value', () => {
        expect(out.useCallback.prereqs[1]).toEqual(false);
        state.mockVal(stateKeys.isOpen, true);
        out = useConfirmAction();
        expect(out.useCallback.prereqs[1]).toEqual(true);
      });
      test('open callback', () => {
        out = useConfirmAction();
        testOpen(prereqs[2]);
      });
    });
    describe('callback', () => {
      it('returns action with labels from config action', () => {
        out = useConfirmAction().useCallback.cb(config);
        testOpen(out.action.onClick);
        expect(out.action.children).toEqual(config.action.labels.default);
        expect(out.confirmProps.isOpen).toEqual(false);
        expect(out.confirmProps.title).toEqual(config.title);
        expect(out.confirmProps.description).toEqual(config.description);
        expect(out.confirmProps.action).toEqual(config.action);
        testClose(out.confirmProps.close);
      });
      it('returns nested action from config action', () => {
        out = useConfirmAction().useCallback.cb(nestedActionConfig);
        testOpen(out.action.onClick);
        expect(out.action.children).toEqual(nestedActionConfig.action.action.labels.default);
        expect(out.confirmProps.isOpen).toEqual(false);
        expect(out.confirmProps.title).toEqual(nestedActionConfig.title);
        expect(out.confirmProps.description).toEqual(nestedActionConfig.description);
        expect(out.confirmProps.action).toEqual(nestedActionConfig.action.action);
        testClose(out.confirmProps.close);
      });
      it('returns action with children from config action', () => {
        state.mockVals({ [stateKeys.isOpen]: true });
        out = useConfirmAction().useCallback.cb(noLabelConfig);
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
