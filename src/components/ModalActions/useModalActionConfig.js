import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useIntl } from '@edx/frontend-platform/i18n';

import { useCloseModal } from 'hooks';
import {
  stepNames,
  stepRoutes,
  stepStates,
  MutationStatus,
} from 'data/services/lms/constants';
import {
  useGlobalState,
  useActiveStepName,
} from 'data/services/lms/hooks/selectors';
import messages from './messages';

const useStartStepAction = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { courseId, xblockId } = useParams();

  const stepName = useActiveStepName();
  if (stepName === stepNames.submission) {
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

const useActiveSubmissionConfig = ({
  options = {},
  closeModal,
  formatMessage,
}) => {
  const saveAndClose = React.useCallback(
    () => (options.saveResponse ? options.saveResponse().then(closeModal) : null),
    [options, closeModal],
  );

  if (!options) { return null; }

  const { submit, submitStatus, saveResponseStatus } = options;

  return {
    primary: {
      onClick: submit,
      state: submitStatus,
      labels: {
        [MutationStatus.idle]: formatMessage(messages.submitResponse),
        [MutationStatus.loading]: formatMessage(messages.submittingResponse),
      },
    },
    secondary: {
      onClick: saveAndClose,
      state: saveResponseStatus,
      labels: {
        [MutationStatus.idle]: formatMessage(messages.finishLater),
        [MutationStatus.loading]: formatMessage(messages.savingResponse),
      },
    },
  };
};

const useModalActionConfig = ({ step, options }) => {
  const globalState = useGlobalState({ step });
  const closeModal = useCloseModal();
  const startStepAction = useStartStepAction();
  const { formatMessage } = useIntl();
  const activeSubmissionConfig = useActiveSubmissionConfig({
    options,
    closeModal,
    formatMessage,
  });

  console.log({ globalState });
  if (globalState.stepState === stepStates.inProgress) {
    return step === stepNames.submission ? activeSubmissionConfig : null;
  }
  if (globalState.activeStepState === stepStates.inProgress) {
    console.log("?");
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
