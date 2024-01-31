import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { usePageDataStatus, useRefreshPageData, useStepInfo } from 'hooks/app';
import { useResetAssessment } from 'hooks/assessment';
import { useEffectiveStep } from 'hooks/routing';
import { useIsMounted } from 'hooks/utils';
import { MutationStatus, stepNames } from 'constants/index';

import messages, { loadNextSteps } from './messages';

export default () => {
  const { formatMessage } = useIntl();
  const isMounted = useIsMounted();
  const resetAssessment = useResetAssessment();
  const refreshPageData = useRefreshPageData();
  const pageDataStatus = usePageDataStatus().status;
  const stepInfo = useStepInfo();
  const step = useEffectiveStep();
  if (
    ![stepNames.studentTraining, stepNames.peer].includes(step)
    || (step === stepNames.peer && stepInfo.peer?.isWaitingForSubmissions)
  ) {
    return null;
  }

  const label = (message) => `${formatMessage(message)} ${formatMessage(loadNextSteps[step])}`;

  return {
    action: {
      onClick: React.useCallback(() => {
        if (isMounted.current) {
          refreshPageData();
          resetAssessment();
        }
      }, [refreshPageData, resetAssessment, isMounted]),
      labels: {
        default: label(messages.loadNext),
        [MutationStatus.idle]: label(messages.loadNext),
        [MutationStatus.loading]: label(messages.loadingNext),
      },
      state: pageDataStatus,
    },
  };
};
