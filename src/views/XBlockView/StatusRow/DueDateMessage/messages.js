import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  yourResponse: {
    defaultMessage: 'Your response',
    description: 'Response label string for sentence context',
    id: 'frontend-app-ora.XBlockView.DueDateMessage.yourResponse',
  },
  studentAssessment: {
    defaultMessage: 'Student assessment',
    description: 'Student assessment label string for sentence context',
    id: 'frontend-app-ora.XBlockView.DueDateMessage.studentAssessment',
  },
  selfAssessment: {
    defaultMessage: 'Self assessment',
    description: 'Self assessment label string for sentence verb context',
    id: 'frontend-app-ora.XBlockView.DueDateMessage.selfAssessment',
  },
  yourSelfAssessment: {
    defaultMessage: 'Your self assessment',
    description: 'Self assessment label string for sentence noun context',
    id: 'frontend-app-ora.XBlockView.DueDateMessage.selfAssessment',
  },
  peerGrading: {
    defaultMessage: 'Peer grading',
    description: 'Peer grading label string for sentence context',
    id: 'frontend-app-ora.XBlockView.DueDateMessage.peerGrading',
  },
  availableStartingOn: {
    defaultMessage: 'Available starting on {dueDate}',
    description: 'Start date message',
    id: 'frontend-app-ora.XBlockView.DueDateMessage.availableStartingOn',
  },
  dueDate: {
    defaultMessage: '{step} is due on {dueDate}',
    description: 'In progress due date',
    id: 'frontend-app-ora.XBlockView.DueDateMessage.responseDue',
  },
  pastDue: {
    defaultMessage: '{step} was due on {dueDate}',
    description: 'End date message',
    id: 'frontend-app-ora.XBlockView.DueDateMessage.responseWasDue',
  },
});

export default messages;
