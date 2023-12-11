import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, stepStates } from 'constants/index';

import { useGlobalState } from 'hooks/app';
import { useViewStep } from 'hooks/routing';

import messages from './messages';

const useInstructionsMessage = (step = null) => {
  const { formatMessage } = useIntl();
  const viewStep = useViewStep();
  const {
    activeStepName,
    effectiveGrade,
    stepState,
  } = useGlobalState();
  const stepName = (viewStep === stepNames.xblock) ? activeStepName : viewStep;
  if (step || stepState !== stepStates.inProgress || stepName === stepNames.staff) {
    return null;
  }
  if (stepName === stepNames.done) {
    return formatMessage(messages[stepNames.done], effectiveGrade);
  }
  return formatMessage(messages[activeStepName]);
};

export default useInstructionsMessage;
