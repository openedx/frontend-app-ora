import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  ERR_INVALID_STATE_FOR_ASSESSMENT: {
    defaultMessage: 'This step is not available. Unable to retrieve the assessment.',
    description: 'Error message for invalid state for assessment',
    id: 'frontend-app-ora.StatusAlerts.ERR_INVALID_STATE_FOR_ASSESSMENT',
  },
  unknownError: {
    defaultMessage: 'An unknown error occurred. Please try again.',
    description: 'Error message for unknown error',
    id: 'frontend-app-ora.StatusAlerts.unknownError',
  },
  errorHeader: {
    defaultMessage: 'Something went wrong.',
    description: 'Error message header',
    id: 'frontend-app-ora.StatusAlerts.errorHeader',
  },
});

export default messages;
