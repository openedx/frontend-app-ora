import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames } from 'constants/index';

const messages = defineMessages({
  [stepNames.submission]: {
    defaultMessage: 'Create a response to the prompt below',
    description: 'Submission step prompt header',
    id: 'frontend-app-ora.Prompt.header.submission',
  },
  [stepNames.studentTraining]: {
    defaultMessage: 'Practice grading a response to the prompt below',
    description: 'Practice step prompt header',
    id: 'frontend-app-ora.Prompt.header.studentTraining',
  },
  [stepNames.self]: {
    defaultMessage: 'Grade your own response to the prompt below',
    description: 'Self step prompt header',
    id: 'frontend-app-ora.Prompt.header.self',
  },
  [stepNames.peer]: {
    defaultMessage: "Grade your peers' responses to the prompt below",
    description: 'Peer step prompt header',
    id: 'frontend-app-ora.Prompt.header.peer',
  },
  [stepNames.done]: {
    defaultMessage: 'Assessment prompt',
    description: 'Done step prompt header',
    id: 'frontend-app-ora.Prompt.header.done',
  },
  promptTitle: {
    defaultMessage: 'Prompt',
    description: 'Prompt title',
    id: 'frontend-app-ora.Prompt.promptTitle',
  },
});

export default messages;
