import moment from 'moment';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  useActiveStepConfig,
  useGlobalState,
} from 'hooks/app';
import { stepNames, stepStates } from 'constants';

import messages from './messages';

const useDueDateMessage = () => {
  const { formatMessage } = useIntl();
  const { activeStepName, stepState } = useGlobalState();
  const stepConfig = useActiveStepConfig();
  const dispDate = ({ value }) => {
    const date = new Date(moment(value));
    return date.toLocaleString();
  };
  let dueDate;
  if (
    activeStepName === stepNames.done
    || activeStepName === stepNames.studentTraining
    || activeStepName === stepNames.staff
    || stepState === stepStates.cancelled
    || stepState === stepStates.needTeam
    || stepState === stepStates.teamAlreadySubmitted
  ) {
    return null;
  }
  if (stepState === stepStates.notAvailable) {
    dueDate = dispDate(stepConfig.startDatetime);
    return formatMessage(messages.availableStartingOn, { dueDate });
  }
  if (stepState === stepStates.closed) {
    const pastDueSteps = {
      [stepNames.submission]: messages.yourResponse,
      [stepNames.self]: messages.yourSelfAssessment,
      [stepNames.peer]: messages.peerGrading,
    };
    dueDate = dispDate(stepConfig.endDatetime);
    const step = formatMessage(pastDueSteps[activeStepName]);
    return formatMessage(messages.pastDue, { dueDate, step });
  }
  const inProgressSteps = {
    [stepNames.submission]: messages.yourResponse,
    [stepNames.self]: messages.selfAssessment,
    [stepNames.peer]: messages.peerGrading,
  };
  // for in-progress steps that are not graded or staff
  return formatMessage(messages.dueDate, {
    dueDate: dispDate(stepConfig.endDatetime),
    step: formatMessage(inProgressSteps[activeStepName]),
  });
};

export default useDueDateMessage;
