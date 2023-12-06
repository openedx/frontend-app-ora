import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  finishLater: {
    id: 'ora-mfe.ModalActions.simpleAction.finishLater',
    defaultMessage: 'Save for later',
    description: 'Save for later (close) button text',
  },
  submitResponse: {
    id: 'ora-mfe.ModalActions.submitResponse',
    defaultMessage: 'Submit response',
    description: 'Submit button text',
  },
  submittingResponse: {
    id: 'ora-mfe.ModalActions.submittingResponse',
    defaultMessage: 'Submitting response',
    description: 'Submit button text while submitting',
  },
  responseSubmitted: {
    id: 'ora-mfe.ModalActions.responseSubmitted',
    defaultMessage: 'Response submitted',
    description: 'Submit button text after successful submission',
  },
  savingResponse: {
    id: 'ora-mfe.ModalActions.savingResponse',
    defaultMessage: 'Saving response',
    description: 'Save for later button text while saving',
  },
});

export default messages;
