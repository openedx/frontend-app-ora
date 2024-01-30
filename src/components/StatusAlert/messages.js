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
    defaultMessage: 'Submission completed',
    description: 'Submission submitted status alert heading',
  },
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.notAvailable',
    defaultMessage: 'Submission not available',
    description: 'Submission not available status alert heading',
  },
  [stepStates.cancelled]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.cancelled',
    defaultMessage: 'Submission cancelled',
    description: 'Submission cancelled status alert heading',
  },
  cancelledBy: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.cancelledBy',
    defaultMessage: 'Submission cancellation details',
    description: 'Submission cancelled by user status alert heading',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.closed',
    defaultMessage: 'Submission closed',
    description: 'Submission closed status alert heading',
  },
  [stepStates.teamAlreadySubmitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.teamAlreadySubmitted',
    defaultMessage: 'Warning: This team has already submitted.',
    description: 'Submission team-already-submitted status alert heading',
  },
  [stepStates.needTeam]: {
    id: 'frontend-app-ora.StatusAlert.Heading.submission.needTeam',
    defaultMessage: 'No team found',
    description: 'Submission need-team status alert heading',
  },
});

const studentTrainingAlerts = defineMessages({
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.studentTraining.submitted',
    defaultMessage: 'Continue to the next example, or if you have completed all examples, continue to the next step.',
    description: 'Practice assessment submitted status alert',
  },
  [stepStates.trainingValidation]: {
    id: 'frontend-app-ora.StatusAlert.studentTraining.validation',
    defaultMessage: 'Your grade does not match what the instructor intended for this practice session.  Try rereading the prompt and response and adjust your grade accordingly.',
    description: 'Student training validation status alert',
  },
});
const studentTrainingHeadings = defineMessages({
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.studentTraining.submitted',
    defaultMessage: 'You have successfully submitted a practice grade.',
    description: 'Practice assessment submitted status alert heading',
  },
});

const selfAlerts = defineMessages({
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.self.notAvailable',
    defaultMessage: 'Self assessment is not available yet. Check back to complete the assignment once this section has opened',
    description: 'Self assessment not available status alert',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.self.closed',
    defaultMessage: 'The due date for this step has passed. This step is now closed. You can no longer complete a self assessment or continue with this assignment, and you will receive a grade of incomplete',
    description: 'Student training closed status alert',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.self.submitted',
    defaultMessage: 'You have completed your self assessment for this assignment.',
    description: 'Self assessment submitted status alert',
  },
});
const selfHeadings = defineMessages({
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.Heading.self.notAvailable',
    defaultMessage: 'Self assessment not available',
    description: 'Self assessment not available status alert heading',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.self.submitted',
    defaultMessage: 'Self assessment: Completed',
    description: 'Self assessment submitted status alert heading',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.Heading.self.closed',
    defaultMessage: 'Self assessment: Closed',
    description: 'Student training closed status alert heading',
  },
});

const peerAlerts = defineMessages({
  [stepStates.waiting]: {
    id: 'frontend-app-ora.StatusAlert.peer.waiting',
    defaultMessage: 'All submitted responses have been assessed. Check back later to see if more learners have submitted responses.',
    description: 'Peer assessment waiting status alert',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.peer.finished',
    defaultMessage: 'You have successfully completed all of the required peer assessments for this assignment. You may assess additional peer responses if you want to.  Completed additional assessments will no affect your grade.',
    description: 'Peer assessment finished status alert',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.peer.closed',
    defaultMessage: 'The due date for this step has passed. This step is now closed. You can no longer complete peer assessments or continue with this assignment, and you will receive a grade of incomplete.',
    description: 'Peer assessment closed status alert',
  },
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.peer.notAvailable',
    defaultMessage: 'This task is not available yet. Check back to complete the assignment once this section has opened',
    description: 'Peer assessment not available status alert',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.peer.submitted',
    defaultMessage: 'Continue to submit peer assessments until you have completed the required number.',
    description: 'Peer assessment submitted status alert',
  },
  [stepStates.waitingForPeerGrades]: {
    id: 'frontend-app-ora.StatusAlert.peer.waitingForPeerGrades',
    defaultMessage: 'You will have completed this step once your peers have finished grading your response. Check back periodically to see if there is an update. Optionally, you may also grade more peers while you wait.',
    description: 'Peer assessment waiting-for-peer-grades status alert',
  },
});
const peerHeadings = defineMessages({
  [stepStates.waiting]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.waiting',
    defaultMessage: 'Waiting for peers to submit',
    description: 'Peer assessment waiting status alert heading',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.finished',
    defaultMessage: 'Peer assessment: Complete',
    description: 'Peer assessment finished status alert heading',
  },
  [stepStates.closed]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.closed',
    defaultMessage: 'Peer assessment: Closed',
    description: 'Peer assessment closed status alert heading',
  },
  [stepStates.notAvailable]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.notAvailable',
    defaultMessage: 'Peer assessment not available',
    description: 'Peer assessment not available status alert heading',
  },
  [stepStates.submitted]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.submitted',
    defaultMessage: 'Peer assessment successfully submitted',
    description: 'Peer assessment submitted status alert',
  },
  [stepStates.waitingForPeerGrades]: {
    id: 'frontend-app-ora.StatusAlert.Heading.peer.waitingForPeerGrades',
    defaultMessage: 'You have graded the required number of your peers. You are waiting for your peers to finish grading your work.',
    description: 'Peer assessment waiting-for-peer-grades status alert heading',
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
    defaultMessage: 'Great work! All assignment steps are completed.',
    description: 'Done status alert heading',
  },
});
const staffAlerts = defineMessages({
  staff: {
    id: 'frontend-app-ora.StatusAlert.xblock.staffAssessment',
    defaultMessage: 'Your final grade will be ready once the instructor has finished grading your response. Check back periodically to see if there is an update.',
    description: 'Status alert message for staff assessment step',
  },
});
const staffHeadings = defineMessages({
  staff: {
    id: 'ora-mfe.StatusAlert.Heading.xblock.staffAssessment',
    defaultMessage: 'All assignment steps are completed. Your final grade is not ready yet.',
    description: 'Status alert message heading for staff assessment step',
  },
});

const messages = defineMessages({
  exit: {
    id: 'frontend-app-ora.StatusAlert.xblock.exit',
    defaultMessage: 'Exit',
    description: 'Status alert exit button text',
  },
  stepNotStarted: {
    id: 'frontend-app-ora.StatusAlert.step.notStarted',
    defaultMessage: '{stepName} step has not started yet. Check back on {startDatetime} to begin.',
    description: 'Step not started status alert',
  },
  stepNotStartedHeading: {
    id: 'frontend-app-ora.StatusAlert.Heading.step.notStarted',
    defaultMessage: '{stepName} not started',
    description: 'Step not started status alert heading',
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
