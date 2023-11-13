import { useIntl } from '@edx/frontend-platform/i18n';

import {
  useGlobalState,
  useStepInfo,
} from 'hooks/app';
import {
  useHasSubmitted,
} from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { useCloseModal } from 'hooks/modal';
import {
  stepNames,
  stepStates,
} from 'constants';

import {
  useFinishLaterAction,
  useLoadNextAction,
  useStartStepAction,
} from 'hooks/actions';
import useActiveSubmissionConfig from './useActiveSubmissionConfig';

const useInProgressActions = ({ options }) => {
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

export default useInProgressActions;
