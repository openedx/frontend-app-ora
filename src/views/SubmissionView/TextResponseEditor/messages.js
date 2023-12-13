import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  textResponsePlaceholder: {
    defaultMessage: 'Enter your response to the prompt above',
    description: 'Placeholder text for the text response input field',
    id: 'frontend-app-ora.TextResponse.textResponsePlaceholder',
  },
  yourResponse: {
    defaultMessage: 'Your response',
    description: 'Label for the text response input field',
    id: 'frontend-app-ora.TextResponse.yourResponse',
  },
  required: {
    defaultMessage: 'required',
    description: 'Label for the required indicator',
    id: 'frontend-app-ora.TextResponse.required',
  },
  optional: {
    defaultMessage: 'Optional',
    description: 'Label for the optional indicator',
    id: 'frontend-app-ora.TextResponse.optional',
  },
});

export default messages;
