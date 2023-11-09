import { useIntl } from '@edx/frontend-platform/i18n';

import {
  useGlobalState,
  usePageDataStatus,
  useRefreshPageData,
  useStepInfo,
} from 'hooks/app';
import {
  useResetAssessment,
  useHasSubmitted,
  useSubmittedAssessment,
} from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { useCloseModal } from 'hooks/modal';
import {
  stepNames,
  stepStates,
  MutationStatus,
} from 'constants';

import useStartStepAction from './useStartStepAction';
import useActiveSubmissionConfig from './useActiveSubmissionConfig';

import messages from '../messages';

export const useSimpleAction = ({ onClick, message }) => {
  const { formatMessage } = useIntl();
  return { onClick, children: formatMessage(message) };
};

export const useLoadNextAction = () => {
  const { formatMessage } = useIntl();

  const resetAssessment = useResetAssessment();
  const refreshPageData = useRefreshPageData();
  const pageDataStatus = usePageDataStatus().status;

  return {
    onClick: () => {
      refreshPageData();
      resetAssessment();
    },
    labels: {
      default: formatMessage(messages.loadNext),
      [MutationStatus.idle]: formatMessage(messages.loadNext),
      [MutationStatus.loading]: formatMessage(messages.loadingNext),
    },
    state: pageDataStatus,
  };
};

export const useCloseAction = (message) => useSimpleAction({ onClick: useCloseModal(), message });

export const useFinishLaterAction = () => useCloseAction(messages.finishLater);
export const useExitAction = () => useCloseAction(messages.exit);

export const useFinishedStateActions = () => {
  const step = useViewStep();
  const globalState = useGlobalState({ step });
  const hasSubmitted = useHasSubmitted();
  const startStepAction = useStartStepAction(step);
  const submittedAssessment = useSubmittedAssessment();
  const loadNextAction = useLoadNextAction();

  const stepState = globalState.activeStepState;

  const finishLaterAction = useFinishLaterAction();
  const exitAction = useExitAction();

  if (!hasSubmitted) {
    return null;
  }

  // assessment finished state
  if (submittedAssessment) {
    const { activeStepName } = globalState;
    // finished and moved to next step
    if (step !== activeStepName) {
      // next step is available
      if (stepState === stepStates.inProgress) {
        return { primary: startStepAction, secondary: finishLaterAction };
      }
      // next step is not available
      return null;
    }
    // finished current assessment but not current step
    if (stepState === stepStates.inProgress) {
      return { primary: loadNextAction, seconday: finishLaterAction };
    }
    // finished current assessment, but not step
    // and there are no more assessments available for the current step
    return { primary: exitAction };
  }
  // submission finished state
  return { primary: startStepAction, secondary: finishLaterAction };
};

export const useInProgressActions = ({ options }) => {
  const { formatMessage } = useIntl();

  const step = useViewStep();
  const closeModal = useCloseModal();
  const globalState = useGlobalState({ step });
  const hasSubmitted = useHasSubmitted();
  const startStepAction = useStartStepAction(step);
  const stepInfo = useStepInfo();
  const activeSubmissionConfig = useActiveSubmissionConfig({
    options,
    closeModal,
    formatMessage,
  });
  const loadNextAction = useLoadNextAction();
  const finishLaterAction = useFinishLaterAction();

  // finished state
  if (hasSubmitted) { return null; }
  if (globalState.activeStepState !== stepStates.inProgress) {
    return null;
  }

  // current step is in-progress and unblocked
  if (globalState.stepState === stepStates.inProgress) {
    // only submission step has inProgress modal actions.
    // assessment step inProgress actions are in the Assessment
    // graded step is never inProgress
    return step === stepNames.submission ? activeSubmissionConfig : null;
  }

  // current step is in progress, but you are not viewing it currently
  const { activeStepName } = globalState;
  // if current step has more assessments
  if (
    [stepNames.peer, stepNames.studentTraining].includes(activeStepName)
    && stepInfo[activeStepName].numberOfAssessmentsCompleted
  ) {
    return { primary: loadNextAction, secondary: finishLaterAction };
  }
  // current step has only one assessment, or is on first one
  return { primary: startStepAction, secondary: finishLaterAction };
};

const useModalActionConfig = ({ options }) => {
  const step = useViewStep();
  const globalState = useGlobalState({ step });
  const hasSubmitted = useHasSubmitted();
  const finishedStateActions = useFinishedStateActions();
  const inProgressActions = useInProgressActions({ options });

  const exitAction = useExitAction();

  // finished state
  if (hasSubmitted) {
    return finishedStateActions;
  }

  // In Progress states
  if (globalState.activeStepState === stepStates.inProgress) {
    return inProgressActions;
  }

  // Graded step
  if (step === stepNames.done) {
    return { primary: exitAction };
  }
  return null;
};

export default useModalActionConfig;
