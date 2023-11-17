import { useNavigate, useParams } from 'react-router-dom';

import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames, stepRoutes } from 'constants';
import { useRefreshPageData, useActiveStepName, useSetResponse } from 'hooks/app';
import { useSetHasSubmitted, useSetShowValidation } from 'hooks/assessment';
import messages from './messages';

const useStartStepAction = (viewStep) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { courseId, xblockId } = useParams();
  const refreshPageData = useRefreshPageData();
  const setHasSubmitted = useSetHasSubmitted();
  const setShowValidation = useSetShowValidation();
  const setResponse = useSetResponse();

  const stepName = useActiveStepName();

  if (viewStep === stepNames.done
    || [stepNames.submission, stepNames.staff].includes(stepName)) {
    return null;
  }

  const onClick = () => {
    console.log("Load next page");
    setHasSubmitted(false);
    setShowValidation(false);
    setResponse(null);
    navigate(`/${stepRoutes[stepName]}/${courseId}/${xblockId}`);
    refreshPageData();
  };

  const startMessages = {
    [stepNames.studentTraining]: messages.startTraining,
    [stepNames.self]: messages.startSelf,
    [stepNames.peer]: messages.startPeer,
    [stepNames.done]: messages.viewGrades,
  };
  return { children: formatMessage(startMessages[stepName]), onClick };
};

export default useStartStepAction;
