import { useNavigate, useParams } from 'react-router-dom';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, stepRoutes } from 'constants';
import { useActiveStepName } from 'hooks/app';
import messages from '../messages';

const useStartStepAction = (viewStep) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { courseId, xblockId } = useParams();

  const stepName = useActiveStepName();

  if (viewStep === stepNames.done
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
  return { children: formatMessage(startMessages[stepName]), onClick };
};

export default useStartStepAction;
