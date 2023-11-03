import { defineMessages } from '@edx/frontend-platform/i18n';

const submission = defineMessages({
  inProgress: {
    id: 'frontend-app-ora.StatusAlert.submission.inProgress',
    defaultMessage: "This assignment has several steps. In the first step you'll provide a response to the prompt.  The other steps appear below the Your Response field",
    description: 'Submission in-progress status alert',
  },
  finished: {
    id: 'frontend-app-ora.StatusAlert.submission.finished',
    defaultMessage: 'Your response has been submitted.  You will receive your grade after all steps are complete and your response is fully assessed.',
    description: 'Submission finished status alert',
  },
  notAvailable: {
    id: 'frontend-app-ora.StatusAlert.submission.notAvailable',
    defaultMessage: 'This task is not available yet.  Check back to complete the assignment once this section has opened',
    description: 'Submission not avilable status alert',
  },
  cancelled: {
    id: 'frontend-app-ora.StatusAlert.submission.cancelled',
    defaultMessage: 'Your submission was cancelled on {cancelledAt}',
    description: 'Submission cancelled status alert',
  },
  cancelledBy: {
    id: 'frontend-app-ora.StatusAlert.submission.cancelledBy',
    defaultMessage: 'Your submission was cancelled by {cancelledBy} on {cancelledAt}',
    description: 'Submission cancelled by user status alert',
  },
  closed: {
    id: 'frontend-app-ora.StatusAlert.submission.closed',
    defaultMessage: 'The due date for this step has passed. This step is now closed. You can no longer submit a response or continue with this problem, and you will receive a grade of incomplete. If you saved but did not submit a response, the response appears in the course records.',
    description: 'Submission closed status alert',
  },
  teamAlreadySubmitted: {
    id: 'frontend-app-ora.StatusAlert.submission.teamAlreadySubmitted',
    defaultMessage: '<Submission Team-Already-Submitted status alert: TODO>',
    description: 'Submission team-already-submitted status alert',
  },
  needTeam: {
    id: 'frontend-app-ora.StatusAlert.submission.needTeam',
    defaultMessage: '<Submission Need-Team status alert: TODO>',
    description: 'Submission need-team status alert',
  },
});

const studentTraining = defineMessages({
  inProgress: {
    id: 'frontend-app-ora.StatusAlert.studentTraining.inProgress',
    defaultMessage: 'This assignment is in progress. Complete the learner training step to move on.',
    description: 'Student Training in progress status alert',
  },
});

const self = defineMessages({
  inProgress: {
    id: 'frontend-app-ora.StatusAlert.self.inProgress',
    defaultMessage: 'This assignment is in progress. You still need to complete the self assessment step.',
    description: 'Student Training in progress status alert',
  },
  closed: {
    id: 'frontend-app-ora.StatusAlert.self.closed',
    defaultMessage: 'The due date for this step has passed. This step is now closed. You can no longer complete a self assessment or continue with this asseignment, and you will receive a grade of inccomplete',
    description: 'Student Training closed status alert',
  },
});

const peer = defineMessages({
  inProgress: {
    id: 'frontend-app-ora.StatusAlert.peer.inProgress',
    defaultMessage: 'This assignment is in progress. You still need to complete the peer assessment step.',
    description: 'Peer Assessment closed status alert',
  },
  waiting: {
    id: 'frontend-app-ora.StatusAlert.peer.waiting',
    defaultMessage: 'All submitted responses have been assessed.  Check back later to see if more learners have submitted responses.',
    description: 'Peer Assessment waiting status alert',
  },
  finished: {
    id: 'frontend-app-ora.StatusAlert.peer.finished',
    defaultMessage: 'You have successfully completed all of the required eer assessments for this assignment. You may assess additional peer responses if you want to.  Completed additional assessments will no affect your grade.',
    description: 'Peer Assessment finished status alert',
  },
  closed: {
    id: 'frontend-app-ora.StatusAlert.peer.closed',
    defaultMessage: 'The due date for this step has passed. This step is now closed. You can no longer complete peer assessments or continue with this assignment, and you will receive a grade of incomplete.',
    description: 'Peer Assessment closed status alert',
  },
});

const done = defineMessages({
  status: {
    id: 'frontend-app-ora.StatusAlert.done',
    defaultMessage: 'You have completed this assignment. Review your grade and your assessment details',
    description: 'Done status alert',
  },
});

const xblock = defineMessages({
  staffAssessment: {
    id: 'frontend-app-ora.StatusAlert.xblock.staffAssessment',
    defaultMessage: 'Your final grade will be ready once the instructor has finished grading your response.  Check back periodically to see if there is an update.',
    description: 'Status alert message for staff assessment step',
  },
  exit: {
    id: 'frontend-app-ora.StatusAlert.xblock.exit',
    defaultMessage: 'Exit',
    description: 'Status alert exit button text',
  },
});

export default {
  submission,
  studentTraining,
  self,
  peer,
  done,
  xblock,
};
