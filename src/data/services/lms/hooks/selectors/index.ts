import { StrictDict } from '@edx/react-unit-test-utils';

import {
  stepNames,
  closedReasons,
  stepStates,
  globalStates,
} from 'data/services/lms/constants';

import * as oraConfigSelectors from './oraConfig';
import * as pageDataSelectors from './pageData';

export * from './oraConfig';
export * from './pageData';

const selectors = {
  ...oraConfigSelectors,
  ...pageDataSelectors,
};

// Meta
export const useStepState = ({ step }) => {
  const hasCancelled = selectors.useHasCancelled();
  const hasReceivedFinalGrade = selectors.useHasReceivedFinalGrade();
  const stepInfo = selectors.useStepInfo();
  const activeStepIndex = selectors.useStepIndex({ step: selectors.useActiveStepName() });
  const stepIndex = selectors.useStepIndex({ step });
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
  if (stepInfo[step]?.isClosed) {
    return stepInfo[step].closedReason === closedReasons.pastDue
      ? stepStates.closed
      : stepStates.notAvailable;
  }
  return stepStates.inProgress;
};

export const useXBlockState = () => {
  const activeStepState = useStepState({ step: selectors.useActiveStepName() });
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
  return stepConfigs[activeStep];
};

export const useGlobalState = (step = null) => {
  const activeStepName = selectors.useActiveStepName();
  const stepState = useStepState({ step: step || activeStepName });
  const lastStep = selectors.useLastStep();
  const effectiveGrade = selectors.useEffectiveGrade();
  const cancellationInfo = selectors.useCancellationInfo();
  return {
    activeStepName,
    cancellationInfo,
    effectiveGrade,
    lastStep,
    stepState,
  };
};

export default StrictDict({
  ...selectors,
  useStepState,
  useXBlockState,
  useActiveStepConfig,
  useGlobalState,
});
