import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { useViewStep, useCloseModal } from 'hooks';
import {
  stepNames,
  stepStates,
  MutationStatus,
} from 'data/services/lms/constants';
import {
  useGlobalState,
  usePageDataStatus,
} from 'data/services/lms/hooks/selectors';
import { useRefreshPageData } from 'data/services/lms/hooks/actions';
import { AssessmentContext } from 'context/AssessmentContext';

import useStartStepAction from './useStartStepAction';
import useActiveSubmissionConfig from './useActiveSubmissionConfig';

import messages from './messages';

const useModalActionConfig = ({ options }) => {
  const assessmentContext = React.useContext(AssessmentContext);
  const step = useViewStep();
  const globalState = useGlobalState({ step });
  const closeModal = useCloseModal();
  const startStepAction = useStartStepAction(step);
  const { formatMessage } = useIntl();
  const activeSubmissionConfig = useActiveSubmissionConfig({
    options,
    closeModal,
    formatMessage,
  });
  const refreshPageData = useRefreshPageData();
  const pageDataStatus = usePageDataStatus().status;
  const finishLater = {
    children: formatMessage(messages.finishLater),
    onClick: closeModal,
  };

  if (assessmentContext.hasSubmitted && assessmentContext.assessment) {
    const { activeStepName, activeStepState } = globalState;
    if (step !== activeStepName) {
      return (activeStepState === stepStates.inProgress)
        ? { primary: startStepAction, secondary: finishLater }
        : null;
    }
    // can only still be on same step if on Peer assessment
    if (activeStepState === stepStates.inProgress) {
      return {
        primary: {
          onClick: () => {
            refreshPageData();
            assessmentContext.reset();
          },
          labels: {
            default: formatMessage(messages.loadNext),
            [MutationStatus.idle]: formatMessage(messages.loadNext),
            [MutationStatus.loading]: formatMessage(messages.loadingNext),
          },
          state: pageDataStatus,
        },
        secondary: finishLater,
      };
    }
  }

  if (globalState.stepState === stepStates.inProgress) {
    return step === stepNames.submission ? activeSubmissionConfig : null;
  }
  if (globalState.activeStepState === stepStates.inProgress) {
    return {
      primary: startStepAction,
      secondary: { children: formatMessage(messages.finishLater), onClick: closeModal },
    };
  }
  if (step === stepNames.done) {
    return { primary: { children: formatMessage(messages.exit), onClick: closeModal } };
  }
  return null;
};

export default useModalActionConfig;
