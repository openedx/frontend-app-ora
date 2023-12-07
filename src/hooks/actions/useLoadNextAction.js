import { useIntl } from '@edx/frontend-platform/i18n';

import {
  usePageDataStatus,
  useRefreshPageData,
} from 'hooks/app';
import { useResetAssessment } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import {
  MutationStatus,
  stepNames,
} from 'constants/index';

import messages, { loadNextSteps } from './messages';

export default () => {
  const { formatMessage } = useIntl();

  const resetAssessment = useResetAssessment();
  const refreshPageData = useRefreshPageData();
  const pageDataStatus = usePageDataStatus().status;
  const step = useViewStep();
  if (![stepNames.studentTraining, stepNames.peer].includes(step)) {
    return null;
  }
  // console.log({ step, loadNextSteps, messages });
  const label = (message) => `${formatMessage(message)} ${formatMessage(loadNextSteps[step])}`;
  return {
    onClick: () => {
      refreshPageData();
      resetAssessment();
    },
    labels: {
      default: label(messages.loadNext),
      [MutationStatus.idle]: label(messages.loadNext),
      [MutationStatus.loading]: label(messages.loadingNext),
    },
    state: pageDataStatus,
  };
};
