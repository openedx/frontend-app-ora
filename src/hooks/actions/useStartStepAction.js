import { useParams } from 'react-router-dom';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Rule } from '@edx/paragon/icons';

import { stepNames, stepRoutes } from 'constants/index';
import {
  useActiveStepName,
} from 'hooks/app';
import messages from './messages';

const useStartStepAction = () => {
  const { formatMessage } = useIntl();
  const { courseId, xblockId } = useParams();

  const stepName = useActiveStepName();

  if ([stepNames.submission, stepNames.staff].includes(stepName)) {
    return null;
  }
  const url = `/${stepRoutes[stepName]}/${courseId}/${xblockId}`;

  const startMessages = {
    [stepNames.studentTraining]: messages.startTraining,
    [stepNames.self]: messages.startSelf,
    [stepNames.peer]: messages.startPeer,
    [stepNames.done]: messages.viewGrades,
  };
  const message = formatMessage(startMessages[stepName]);
  if (stepName === stepNames.done) {
    return {
      action: {
        iconBefore: Rule,
        children: message,
        href: url,
      },
    };
  }
  return { action: { children: message, href: url } };
};

export default useStartStepAction;
