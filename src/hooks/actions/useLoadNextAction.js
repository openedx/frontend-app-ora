import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  usePageDataStatus,
  useRefreshPageData,
  useActiveStepName,
  useStepInfo,
} from 'hooks/app';
import { useResetAssessment } from 'hooks/assessment';
import { useViewStep } from 'hooks/routing';
import { useIsMounted } from 'hooks/utils';
import { MutationStatus, stepNames } from 'constants/index';
import { isXblockStep } from 'utils';

import messages, { loadNextSteps } from './messages';

export default () => {
  const { formatMessage } = useIntl();
  const isMounted = useIsMounted();
  const resetAssessment = useResetAssessment();
  const refreshPageData = useRefreshPageData();
  const pageDataStatus = usePageDataStatus().status;
  const viewStep = useViewStep();
  const activeStep = useActiveStepName();
  const stepInfo = useStepInfo();
  const step = isXblockStep(viewStep) ? activeStep : viewStep;
  if (
    !(
      step === stepNames.studentTraining
      || (step === stepNames.peer)
      || (step === stepNames.peer && !stepInfo.peer?.isWaitingForSubmissions)
    )
  ) {
    return null;
  }
  const label = (message) => `${formatMessage(message)} ${formatMessage(loadNextSteps[step])}`;
  const onClick = React.useCallback(() => {
    if (isMounted.current) {
      refreshPageData();
      resetAssessment();
    }
  }, [refreshPageData, resetAssessment, isMounted]);
  return {
    action: {
      onClick,
      labels: {
        default: label(messages.loadNext),
        [MutationStatus.idle]: label(messages.loadNext),
        [MutationStatus.loading]: label(messages.loadingNext),
      },
      state: pageDataStatus,
    },
  };
};
