import { useIntl } from '@edx/frontend-platform/i18n';

import { useStepState } from 'hooks/app';

import { alertMap } from './constants';

export const useAlertConfig = ({ step }) => alertMap[useStepState({ step })];

const useCreateAlert = ({ step }) => {
  const { formatMessage } = useIntl();
  const alertConfig = useAlertConfig({ step });
  return ({
    heading,
    message,
    actions,
    headingVals = {},
    messageVals = {},
    ...overrides
  }) => ({
    ...alertConfig,
    message: formatMessage(message, messageVals),
    heading: heading && formatMessage(heading, headingVals),
    actions,
    ...overrides,
  });
};

export default useCreateAlert;
