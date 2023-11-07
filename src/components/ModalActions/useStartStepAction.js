import { useNavigate, useParams } from 'react-router-dom';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, stepRoutes } from 'data/services/lms/constants';
import { useActiveStepName } from 'data/services/lms/hooks/selectors';
import messages from './messages';

const useStartStepAction = (viewStep) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { courseId, xblockId } = useParams();

  const stepName = useActiveStepName();

  if (viewStep === stepNames.done
    || stepName === stepNames.waiting
    || [stepNames.submission, stepNames.staff].includes(stepName)) {
    return null;
  }

  const onClick = () => navigate(`/${stepRoutes[stepName]}/${courseId}/${xblockId}`);

  const startMessages = {
    [stepNames.studentTraining]: messages.startTraining,
    [stepNames.self]: messages.startSelf,
    [stepNames.peer]: messages.startPeer,
    [stepNames.done]: messages.viewGrades,
  };
  if ( startMessages[stepName] ) {
    return { children: formatMessage(startMessages[stepName]), onClick };
  }
  console.error(`No start message for step ${stepName}`)
  return { children: formatMessage(startMessages[stepNames.done]), onClick }
};

export default useStartStepAction;
