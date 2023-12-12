import { defineMessages } from '@edx/frontend-platform/i18n';
import { stepNames, stepStates } from 'constants/index';

const submissionAlerts = defineMessages({
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.submission.submitted',
    defaultMessage: 'Your response has been submitted.  You will receive your grade after all steps are complete and your response is fully assessed.',
    description: 'Submission submitted status alert',
  },
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.submission.notAvailable',
    defaultMessage: 'This task is not available yet.  Check back to complete the assignment once this section has opened',
    description: 'Submission not available status alert',
  },
  [stepStates.cancelled]: {
    id: 'frontend-app-ora.StatusAlert.submission.cancelled',
    defaultMessage: 'Your submission was cancelled on {cancelledAt}',
    description: 'Submission cancelled status alert',
  },
  cancelledBy: {
    id: 'frontend-app-ora.StatusAlert.submission.cancelledBy',
    defaultMessage: 'Your submission was cancelled by {cancelledBy} on {cancelledAt}',
    description: 'Submission cancelled by user status alert',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.submission.closed',
    defaultMessage: 'The due date for this step has passed. This step is now closed. You can no longer submit a response or continue with this problem, and you will receive a grade of incomplete. If you saved but did not submit a response, the response appears in the course records.',
    description: 'Submission closed status alert',
  },
  [stepStates.teamAlreadySubmitted]: {
    id: 'frontend-app-ora.StatusAlert.submission.teamAlreadySubmitted',
    defaultMessage: 'You joined this team after they submitted a response for this assignment and you will not receive a grade for their response. You have also not previously submitted a response to this assignment with another team. Please contact course staff to discuss your options for this assignment.',
    description: 'Submission team-already-submitted status alert',
  },
  [stepStates.needTeam]: {
    id: 'frontend-app-ora.StatusAlert.submission.needTeam',
    defaultMessage: 'This is a team assignment. You are currently not on a team. You must be on a team to access this team assignment.',
    description: 'Submission need-team status alert',
  },
});
const submissionHeadings = defineMessages({
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.submitted',
    defaultMessage: 'Submission Completed',
    description: 'Submission submitted status alert heading',
  },
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.notAvailable',
    defaultMessage: 'Submission Not Available',
    description: 'Submission not available status alert heading',
  },
  [stepStates.cancelled]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.cancelled',
    defaultMessage: 'Submission Cancelled',
    description: 'Submission cancelled status alert heading',
  },
  cancelledBy: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.cancelledBy',
    defaultMessage: 'Submission Cancellation Details',
    description: 'Submission cancelled by user status alert heading',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.closed',
    defaultMessage: 'Submission Closed',
    description: 'Submission closed status alert heading',
  },
  [stepStates.teamAlreadySubmitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.teamAlreadySubmitted',
    defaultMessage: 'Warning: This team has already submitted.',
    description: 'Submission team-already-submitted status alert heading',
  },
  [stepStates.needTeam]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.needTeam',
    defaultMessage: 'No Team Found',
    description: 'Submission need-team status alert heading',
  },
});

const studentTrainingAlerts = defineMessages({
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.studentTraining.submitted',
    defaultMessage: 'You have completed this practice grading example. Continue to the next example, or if you have completed all examples, continue to the next step.',
    description: 'Practice Assessment submitted status alert',
  },
  [stepStates.trainingValidation]: {
    id: 'frontend-app-ora.StatusAlert.studentTraining.validation',
    defaultMessage: 'Your grade does not match what the instructor intended for this practice session.  Try rereading the prompt and response and adjust your grade accordingly.',
    description: 'Student Training validation status alert',
  },
});
const studentTrainingHeadings = defineMessages({
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.studentTraining.submitted',
    defaultMessage: 'Student Training: Submitted',
    description: 'Practice Assessment submitted status alert heading',
  },
});

const selfAlerts = defineMessages({
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.self.closed',
    defaultMessage: 'The due date for this step has passed. This step is now closed. You can no longer complete a self assessment or continue with this assignment, and you will receive a grade of incomplete',
    description: 'Student Training closed status alert',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.self.submitted',
    defaultMessage: 'You have completed your self assessment for this assignment.',
    description: 'Self Assessment submitted status alert',
  },
});
const selfHeadings = defineMessages({
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.self.submitted',
    defaultMessage: 'Self Assessment Completed',
    description: 'Self Assessment submitted status alert heading',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.Heading.self.closed',
    defaultMessage: 'Self Assessment: Closed',
    description: 'Student Training closed status alert heading',
  },
});

const peerAlerts = defineMessages({
  [stepStates.waiting]: {
    id: 'frontend-app-ora.StatusAlert.peer.waiting',
    defaultMessage: 'All submitted responses have been assessed.  Check back later to see if more learners have submitted responses.',
    description: 'Peer Assessment waiting status alert',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.peer.finished',
    defaultMessage: 'You have successfully completed all of the required peer assessments for this assignment. You may assess additional peer responses if you want to.  Completed additional assessments will no affect your grade.',
    description: 'Peer Assessment finished status alert',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.peer.closed',
    defaultMessage: 'The due date for this step has passed. This step is now closed. You can no longer complete peer assessments or continue with this assignment, and you will receive a grade of incomplete.',
    description: 'Peer Assessment closed status alert',
  },
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.peer.notAvailable',
    defaultMessage: 'This task is not available yet.  Check back to complete the assignment once this section has opened',
    description: 'Peer Assessment not available status alert',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.peer.submitted',
    defaultMessage: 'Continue to submit peer assessments until you have completed the required number.',
    description: 'Peer Assessment submitted status alert',
  },
});
const peerHeadings = defineMessages({
  [stepStates.waiting]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.waiting',
    defaultMessage: 'Waiting for peers to submit',
    description: 'Peer Assessment waiting status alert heading',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.finished',
    defaultMessage: 'Peer Assessment Complete',
    description: 'Peer Assessment finished status alert heading',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.closed',
    defaultMessage: 'Peer Assessment Closed',
    description: 'Peer Assessment closed status alert heading',
  },
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.notAvailable',
    defaultMessage: 'Peer Assessment not available',
    description: 'Peer Assessment not available status alert heading',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.submitted',
    defaultMessage: 'Peer Assessment Successfully Submitted',
    description: 'Peer Assessment submitted status alert',
  },
});

const doneAlerts = defineMessages({
  status: {
    id: 'frontend-app-ora.StatusAlert.status',
    defaultMessage: 'You have completed this assignment. Review your grade and your assessment details',
    description: 'Done status alert',
  },
});
const doneHeadings = defineMessages({
  status: {
    id: 'frontend-app-ora.StatusAlert.Heading.status',
    defaultMessage: 'Assignment Complete and Graded',
    description: 'Done status alert heading',
  },
});
const staffAlerts = defineMessages({
  staff: {
    id: 'frontend-app-ora.StatusAlert.xblock.staffAssessment',
    defaultMessage: 'Your final grade will be ready once the instructor has finished grading your response.  Check back periodically to see if there is an update.',
    description: 'Status alert message for staff assessment step',
  },
});
const staffHeadings = defineMessages({
  staff: {
    id: 'ora-mfe.StatusAlert.Heading.xblock.staffAssessment',
    defaultMessage: 'Great work! All assignment steps are completed.',
    description: 'Status alert message heading for staff assessment step',
  },
});

const messages = defineMessages({
  exit: {
    id: 'frontend-app-ora.StatusAlert.xblock.exit',
    defaultMessage: 'Exit',
    description: 'Status alert exit button text',
  },
});

export default {
  headings: {
    [stepNames.submission]: submissionHeadings,
    [stepNames.studentTraining]: studentTrainingHeadings,
    [stepNames.self]: selfHeadings,
    [stepNames.peer]: peerHeadings,
    [stepNames.done]: doneHeadings,
    [stepNames.staff]: staffHeadings,
  },
  alerts: {
    [stepNames.submission]: submissionAlerts,
    [stepNames.studentTraining]: studentTrainingAlerts,
    [stepNames.self]: selfAlerts,
    [stepNames.peer]: peerAlerts,
    [stepNames.done]: doneAlerts,
    [stepNames.staff]: staffAlerts,
  },
  ...messages,
};
