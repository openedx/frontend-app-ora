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

/**
 * useModalActionConfig({ options })
 * @description Returns the action config for the modal
 * @param {Object} options - options for the hook to be passed to inProgressActions
 * @returns {Object} - action config for the modal
 */
const useModalActionConfig = ({ options }) => {
  const viewStep = useViewStep();
  const globalState = useGlobalState();
  const hasSubmitted = useHasSubmitted();
  const finishedStateActions = useFinishedStateActions();
  const inProgressActions = useInProgressActions({ options });
  const stepInfo = useStepInfo();

  const loadNextAction = useLoadNextAction();
  const startStepAction = useStartStepAction();
  const closeModal = useCloseModalAction();

  const closeModalConfig = { primary: closeModal };
  const startStepActionConfig = { primary: startStepAction, secondary: closeModal };
  const loadNextActionConfig = { primary: loadNextAction, secondary: closeModal };

  if (globalState.hasReceivedFinalGrade) {
    return viewStep === stepNames.done ? closeModalConfig : startStepActionConfig;
  }

  const { isWaitingForSubmissions } = stepInfo.peer || {};

  const { activeStepState } = globalState;
  // finished state
  if (hasSubmitted) {
    // if we have graded enough but not received enough
    if (viewStep === stepNames.peer && activeStepState === stepStates.waitingForPeerGrades) {
      // exit only if next is not available
      return isWaitingForSubmissions ? closeModalConfig : loadNextActionConfig;
    }

    return (activeStepState !== stepStates.inProgress) ? closeModalConfig : finishedStateActions;
  }

  // In Progress states
  if (activeStepState === stepStates.inProgress) {
    return inProgressActions;
  }

  return null;
};

export default useModalActionConfig;
