import { useViewStep } from 'hooks/routing';
import { useGlobalState, useHasReceivedFinalGrade } from 'hooks/app';

import { stepNames, stepStates } from 'constants/index';

import messages from '../messages';
import useCreateAlert from './useCreateAlert';
import {
  useGradedAlerts,
  useStaffAlerts,
} from './simpleAlerts';

import useModalAlerts from './useModalAlerts';
import useCancelledAlerts from './useCancelledAlerts';

const useStatusAlertData = ({
  step = null,
}) => {
  const {
    activeStepName,
    stepState,
  } = useGlobalState({ step });
  const isDone = useHasReceivedFinalGrade();
  const viewStep = useViewStep();

  const createAlert = useCreateAlert({ step });
  const modalAlerts = useModalAlerts({ step });
  const gradedAlerts = useGradedAlerts({ step });
  const { hasCancelled, cancelledAlerts } = useCancelledAlerts({ step });
  const staffAlerts = useStaffAlerts({ step });

  const stepName = step || activeStepName;

  if (isDone) {
    return gradedAlerts;
  }
  if (viewStep !== stepNames.xblock) {
    return modalAlerts;
  }
  if (hasCancelled) {
    return cancelledAlerts;
  }

  if (stepName === stepNames.staff) {
    return staffAlerts;
  }
  if (stepState === stepStates.inProgress) {
    return [];
  }

  return [createAlert({
    message: messages.alerts[stepName][stepState],
    heading: messages.headings[stepName][stepState],
  })];
};

export default useStatusAlertData;
