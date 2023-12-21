import { StrictDict } from '@edx/react-unit-test-utils';

import {
  stepNames,
  closedReasons,
  stepStates,
} from 'constants/index';

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
  const stepName = step || activeStepName || stepNames.submission;
  const activeStepIndex = selectors.useStepIndex({ step: activeStepName });
  const stepIndex = selectors.useStepIndex({ step: stepName });
  const subState = selectors.useSubmissionState();
  const trainingStepIsCompleted = selectors.useTrainingStepIsCompleted();
  const stepConfig = selectors.useAssessmentStepConfig()?.settings || {};

  if (!stepInfo || !activeStepName || stepIndex === undefined || activeStepIndex === undefined) {
    return '';
  }

  if (hasReceivedFinalGrade) {
    return stepStates.done;
  }

  if (stepName === stepNames.submission) {
    return subState;
  }

  // Cancelled submission affects all states
  if (hasCancelled) { return stepStates.cancelled; }

  if (stepName === stepNames.done) {
    return hasReceivedFinalGrade ? stepStates.done : stepStates.notAvailable;
  }

  if (stepName === stepNames.studentTraining && trainingStepIsCompleted) {
    return stepStates.done;
  }
  if (step === stepNames.peer && stepInfo?.peer) {
    const config = stepConfig[stepNames.peer];
    const { numberOfAssessmentsCompleted, numberOfReceivedAssessments } = stepInfo.peer;
    const { minNumberToGrade, minNumberToBeGradedBy } = config;
    const gradingDone = minNumberToGrade <= numberOfAssessmentsCompleted;
    const receivingDone = minNumberToBeGradedBy <= numberOfReceivedAssessments;
    if (gradingDone && !receivingDone) {
      return stepStates.waitingForPeerGrades;
    }
    if (stepInfo.peer.isWaitingForSubmissions) {
      return stepStates.waiting;
    }
  }

  // For Assessment steps
  if (stepIndex < activeStepIndex) { return stepStates.done; }
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
  if (!stepConfigs || !activeStep) {
    return '';
  }
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
  const hasReceivedFinalGrade = selectors.useHasReceivedFinalGrade();
  return {
    activeStepName,
    activeStepState,
    cancellationInfo,
    effectiveGrade,
    hasReceivedFinalGrade,
    lastStep,
    stepState,
  };
};

export const useTextResponses = () => {
  const prompts = selectors.usePrompts() || [];
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
