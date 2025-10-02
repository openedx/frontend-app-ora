import { when } from 'jest-when';
import { stepNames } from 'constants/index';
import {
  useFinishLater,
  useGlobalState,
  useHasSubmitted,
  useTextResponses,
} from 'hooks/app';
import { useCloseModal } from 'hooks/modal';

import useOnCloseModal from './useOnCloseModal';

jest.mock('hooks/app', () => ({
  useFinishLater: jest.fn(),
  useGlobalState: jest.fn(),
  useHasSubmitted: jest.fn(),
  useTextResponses: jest.fn(),
}));
jest.mock('hooks/modal', () => ({
  useCloseModal: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn((cb, prereqs) => ({ useCallback: { cb, prereqs } })),
}));

const finishLater = { mutateAsync: args => ({ mutateAsync: args }) };
when(useFinishLater).calledWith().mockReturnValue(finishLater);
when(useGlobalState).calledWith().mockReturnValue({ activeStepName: stepNames.peer });
const closeModal = jest.fn(() => 'closeModal');
when(useCloseModal).calledWith().mockReturnValue(closeModal);
const textResponses = ['response1', 'response2'];
when(useTextResponses).calledWith().mockReturnValue(textResponses);
when(useHasSubmitted).calledWith().mockReturnValue(false);

const userConfirm = () => Promise.resolve(true);
const userDeny = () => Promise.resolve(false);

describe('useOnCloseModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('behavior', () => {
    it('loads state and actions from hooks', () => {
      useOnCloseModal(userConfirm);
      expect(useFinishLater).toHaveBeenCalledWith();
      expect(useGlobalState).toHaveBeenCalledWith();
      expect(useCloseModal).toHaveBeenCalledWith();
      expect(useTextResponses).toHaveBeenCalledWith();
      expect(useHasSubmitted).toHaveBeenCalledWith();
    });
  });
  describe('output memoized callback', () => {
    test('prereqs', () => {
      const { prereqs } = useOnCloseModal(userConfirm).useCallback;
      expect(prereqs).toEqual([
        stepNames.peer,
        closeModal,
        finishLater,
        false,
        textResponses,
        userConfirm,
      ]);
    });
    describe('callback', () => {
      it('returns finishLater with textResponses if submission and not submitted', () => {
        when(useGlobalState).calledWith()
          .mockReturnValueOnce({ activeStepName: stepNames.submission });
        const { cb } = useOnCloseModal(userConfirm).useCallback;
        expect(cb()).toEqual(finishLater.mutateAsync({ textResponses }));
      });
      it('returns closeModal if no userConfirm method is passed', () => {
        const { cb } = useOnCloseModal().useCallback;
        expect(cb()).toEqual(closeModal());
      });
      it('returns closeModal if hasSubmitted', () => {
        when(useHasSubmitted).calledWith().mockReturnValueOnce(true);
        const { cb } = useOnCloseModal(userConfirm).useCallback;
        expect(cb()).toEqual(closeModal());
      });
      it('returns userConfirm that closesModal on confirm', async () => {
        const { cb } = useOnCloseModal(userConfirm).useCallback;
        await cb();
        expect(closeModal).toHaveBeenCalled();
      });
      it('returns userConfirm that does not closes modal on failed confirm', async () => {
        const { cb } = useOnCloseModal(userDeny).useCallback;
        await cb();
        expect(closeModal).not.toHaveBeenCalled();
      });
    });
  });
});
