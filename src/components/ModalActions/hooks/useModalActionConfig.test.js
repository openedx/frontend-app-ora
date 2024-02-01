import { when } from 'jest-when';

import { stepNames, stepStates } from 'constants/index';

import { useGlobalState, useStepInfo } from 'hooks/app';
import { useHasSubmitted } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import {
  useCloseModalAction,
  useLoadNextAction,
  useStartStepAction,
} from 'hooks/actions';

import useFinishedStateActions from './useFinishedStateActions';
import useInProgressActions from './useInProgressActions';

import useModalActionConfig from './useModalActionConfig';

jest.mock('hooks/app', () => ({
  useGlobalState: jest.fn(),
  useStepInfo: jest.fn(),
}));
jest.mock('hooks/assessment', () => ({
  useHasSubmitted: jest.fn(),
}));
jest.mock('hooks/routing', () => ({
  useViewStep: jest.fn(),
}));
jest.mock('hooks/actions', () => ({
  useCloseModalAction: jest.fn(),
  useLoadNextAction: jest.fn(),
  useStartStepAction: jest.fn(),
}));
jest.mock('./useFinishedStateActions', () => jest.fn());
jest.mock('./useInProgressActions', () => jest.fn());

const globalState = {
  activeStepState: stepStates.inProgress,
  hasReceivedFinalGrade: false,
};
when(useGlobalState).calledWith().mockReturnValue(globalState);
const stepInfo = {
  peer: { isWaitingForSubmissions: false },
};
when(useStepInfo).calledWith().mockReturnValue(stepInfo);
when(useViewStep).calledWith().mockReturnValue(stepNames.peer);
when(useHasSubmitted).calledWith().mockReturnValue(false);
const closeModalAction = { closeModal: 'action' };
when(useCloseModalAction).calledWith().mockReturnValue(closeModalAction);
const loadNextAction = { loadNext: 'action' };
when(useLoadNextAction).calledWith().mockReturnValue(loadNextAction);
const startStepAction = { startStep: 'action' };
when(useStartStepAction).calledWith().mockReturnValue(startStepAction);

const options = { test: 'options' };

const inProgressActions = { inProgress: 'action' };
when(useInProgressActions).calledWith(expect.anything()).mockReturnValue(inProgressActions);
const finishedStateActions = { finishStep: 'action' };
when(useFinishedStateActions).calledWith().mockReturnValue(finishedStateActions);

let out;
describe('useModalActionConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('behavior', () => {
    it('loads state and actions from hooks', () => {
      out = useModalActionConfig({ options });
      expect(useViewStep).toHaveBeenCalledWith();
      expect(useGlobalState).toHaveBeenCalledWith();
      expect(useHasSubmitted).toHaveBeenCalledWith();
      expect(useFinishedStateActions).toHaveBeenCalledWith();
      expect(useInProgressActions).toHaveBeenCalledWith({ options });
      expect(useStepInfo).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    describe('graded', () => {
      it('returns exit primary action on graded view', () => {
        when(useGlobalState).calledWith().mockReturnValueOnce({
          activeStepState: stepStates.done,
          hasReceivedFinalGrade: true,
        });
        when(useViewStep).calledWith().mockReturnValueOnce(stepNames.done);
        out = useModalActionConfig({ options });
        expect(out).toEqual({ primary: closeModalAction });
      });
      it('returns startStep primary action and exit secondary action on step re-visit', () => {
        when(useGlobalState).calledWith().mockReturnValueOnce({
          activeStepState: stepStates.done,
          hasReceivedFinalGrade: true,
        });
        out = useModalActionConfig({ options });
        expect(out).toEqual({
          primary: startStepAction,
          secondary: closeModalAction,
        });
      });
    });
    describe('view is submitted', () => {
      beforeEach(() => {
        when(useHasSubmitted).calledWith().mockReturnValueOnce(true);
      });
      describe('if waitingForPeerGrades', () => {
        beforeEach(() => {
          when(useGlobalState).calledWith().mockReturnValueOnce({
            activeStepState: stepStates.waitingForPeerGrades,
            hasReceivedFinalGrade: false,
          });
        });
        it('returns exit config if waitingForSubmissions', () => {
          when(useStepInfo).calledWith().mockReturnValueOnce({
            peer: { isWaitingForSubmissions: true },
          });
          out = useModalActionConfig({ options });
          expect(out).toEqual({ primary: closeModalAction });
        });
        it('returns loadNextAction config if not waitingForSubmissions', () => {
          out = useModalActionConfig({ options });
          expect(out).toEqual({ primary: loadNextAction, secondary: closeModalAction });
        });
      });
      it('returns exit config if active step is not in progress', () => {
        when(useGlobalState).calledWith().mockReturnValueOnce({
          activeStepState: stepStates.waiting,
          hasReceivedFinalGrade: false,
        });
        out = useModalActionConfig({ options });
        expect(out).toEqual({ primary: closeModalAction });
      });
      it('returns finishedStateActions if active step is in progress', () => {
        when(useGlobalState).calledWith().mockReturnValueOnce({
          activeStepState: stepStates.inProgress,
          hasReceivedFinalGrade: false,
        });
        out = useModalActionConfig({ options });
        expect(out).toEqual(finishedStateActions);
      });
    });
    it('returns inProgress actions if active step is in progress', () => {
      when(useGlobalState).calledWith().mockReturnValueOnce({
        activeStepState: stepStates.inProgress,
        hasReceivedFinalGrade: false,
      });
      out = useModalActionConfig({ options });
      expect(out).toEqual(inProgressActions);
    });
    it('returns exit action for graded view', () => {
      when(useViewStep).calledWith().mockReturnValueOnce(stepNames.done);
      when(useGlobalState).calledWith().mockReturnValueOnce({
        activeStepState: stepStates.done,
        hasReceivedFinalGrade: true,
      });
      expect(useModalActionConfig({ options })).toEqual({ primary: closeModalAction });
    });
    it('returns null for if not submitted and active step is not in progress', () => {
      when(useHasSubmitted).calledWith().mockReturnValueOnce(false);
      when(useGlobalState).calledWith().mockReturnValueOnce({
        activeStepState: stepStates.trainingValidation,
        hasReceivedFinalGrade: false,
      });
      when(useViewStep).calledWith().mockReturnValueOnce(stepNames.studentTraining);
      out = useModalActionConfig({ options });
      expect(out).toEqual(null);
    });
  });
});
