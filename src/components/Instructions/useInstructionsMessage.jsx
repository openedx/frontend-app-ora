import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, stepStates } from 'constants/index';

import { useGlobalState } from 'hooks/app';
import { useViewStep } from 'hooks/routing';

import messages from './messages';

const useInstructionsMessage = () => {
  const { formatMessage } = useIntl();
  const viewStep = useViewStep();
  const {
    activeStepName,
    effectiveGrade,
    stepState,
  } = useGlobalState();
  const stepName = (viewStep === stepNames.xblock) ? activeStepName : viewStep;
  if (stepState !== stepStates.inProgress || stepName === stepNames.staff) {
    return null;
  }
  if (stepName === stepNames.done) {
    return formatMessage(messages[stepNames.done], effectiveGrade);
  }
  return messages[stepName] && formatMessage(messages[stepName]);
};

export default useInstructionsMessage;
