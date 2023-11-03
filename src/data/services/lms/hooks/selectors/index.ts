import { StrictDict } from '@edx/react-unit-test-utils';

import {
  stepNames,
  closedReasons,
  stepStates,
  globalStates,
} from 'data/services/lms/constants';
import { useViewStep } from 'hooks';

import * as oraConfigSelectors from './oraConfig';
import * as pageDataSelectors from './pageData';

export * from './oraConfig';
export * from './pageData';

const selectors = {
  ...oraConfigSelectors,
  ...pageDataSelectors,
};

// Meta
export const useStepState = ({ step = null } = {}) => {
  const activeStepName = selectors.useActiveStepName();
  const hasCancelled = selectors.useHasCancelled();
  const hasReceivedFinalGrade = selectors.useHasReceivedFinalGrade();
  const stepInfo = selectors.useStepInfo();
  const stepName = step || activeStepName;
  const activeStepIndex = selectors.useStepIndex({ step: activeStepName });
  const stepIndex = selectors.useStepIndex({ step: stepName });
  const subState = selectors.useSubmissionState();
  if (hasReceivedFinalGrade) {
    return stepStates.completed;
  }

  if (step === stepNames.submission) {
    return subState;
  }

  // Cancelled submission affects all states
  if (hasCancelled) { return stepStates.cancelled; }

  if (step === stepNames.done) {
    return hasReceivedFinalGrade ? stepStates.completed : stepStates.notAvailable;
  }

  if (step === stepNames.peer && stepInfo?.peer?.isWaitingForSubmissions) {
    return stepStates.waiting;
  }
  // For Assessment steps
  if (stepIndex < activeStepIndex) { return stepStates.completed; }
  if (stepIndex > activeStepIndex) { return stepStates.notAvailable; }

  // only check for closed or not-available on active step
  if (stepInfo[stepName]?.isClosed) {
    return stepInfo[stepName].closedReason === closedReasons.pastDue
      ? stepStates.closed
      : stepStates.notAvailable;
  }
  return stepStates.inProgress;
};

export const useXBlockState = () => {
  const activeStepState = useStepState();
  if ([
    stepStates.cancelled,
    stepStates.closed,
    stepStates.notAvailable,
  ].includes(activeStepState)) {
    return activeStepState;
  }
  return stepStates.inProgress;
};

export const useActiveStepConfig = () => {
  const activeStep = selectors.useActiveStepName();
  const stepConfigs = selectors.useAssessmentStepConfig();
  const subConfig = selectors.useSubmissionConfig();
  if (activeStep === stepNames.submission) {
    return subConfig;
  }
  return stepConfigs.settings[activeStep];
};

export const useGlobalState = ({ step = null } = {}) => {
  const activeStepName = selectors.useActiveStepName();
  const activeStepState = useStepState();
  const stepState = useStepState({ step });
  const lastStep = selectors.useLastStep();
  const effectiveGrade = selectors.useEffectiveGrade();
  const cancellationInfo = selectors.useCancellationInfo();
  return {
    activeStepName,
    activeStepState,
    cancellationInfo,
    effectiveGrade,
    lastStep,
    stepState,
  };
};

export const useTextResponses = () => {
  const prompts = selectors.usePrompts();
  const response = selectors.useResponseData();
  return response ? response.textResponses : prompts.map(() => '');
};

export default StrictDict({
  ...selectors,
  useStepState,
  useXBlockState,
  useActiveStepConfig,
  useGlobalState,
});
