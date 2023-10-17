import { defineMessages } from '@edx/frontend-platform/i18n';

const submission = defineMessages({
  inProgress: {
    id: 'ora-grading.StatusAlert.Heading.submission.inProgress',
    defaultMessage: 'Submission in progress <TODO>',
    description: 'Submission in-progress status alert heading',
  },
  finished: {
    id: 'ora-grading.StatusAlert.Heading.submission.finished',
    defaultMessage: 'Submission finished <TODO>',
    description: 'Submission finished status alert heading',
  },
  notAvailable: {
    id: 'ora-grading.StatusAlert.Heading.submission.notAvailable',
    defaultMessage: 'Submission not available <TODO>',
    description: 'Submission not avilable status alert heading',
  },
  cancelled: {
    id: 'ora-grading.StatusAlert.Heading.submission.cancelled',
    defaultMessage: 'Submission cancelled <TODO>',
    description: 'Submission cancelled status alert heading',
  },
  cancelledBy: {
    id: 'ora-grading.StatusAlert.Heading.submission.cancelledBy',
    defaultMessage: 'Submission cancelled <TODO>',
    description: 'Submission cancelled by user status alert heading',
  },
  closed: {
    id: 'ora-grading.StatusAlert.Heading.submission.closed',
    defaultMessage: 'Submission closed <TODO>',
    description: 'Submission closed status alert heading',
  },
  teamAlreadySubmitted: {
    id: 'ora-grading.StatusAlert.Heading.submission.teamAlreadySubmitted',
    defaultMessage: '<Submission Team-Already-Submitted status alert heading: TODO>',
    description: 'Submission team-already-submitted status alert heading',
  },
  needTeam: {
    id: 'ora-grading.StatusAlert.Heading.submission.needTeam',
    defaultMessage: '<Submission Need-Team status alert heading: TODO>',
    description: 'Submission need-team status alert heading',
  },
});

const studentTraining = defineMessages({
  inProgress: {
    id: 'ora-grading.StatusAlert.Heading.studentTraining.inProgress',
    defaultMessage: 'Student Training <TODO>',
    description: 'Student Training in progress status alert heading',
  },
});

const self = defineMessages({
  inProgress: {
    id: 'ora-grading.StatusAlert.Heading.self.inProgress',
    defaultMessage: 'Self in progress <TODO>',
    description: 'Student Training in progress status alert heading',
  },
  closed: {
    id: 'ora-grading.StatusAlert.Heading.self.closed',
    defaultMessage: 'Self closed <TODO>',
    description: 'Student Training closed status alert heading',
  },
});

const peer = defineMessages({
  inProgress: {
    id: 'ora-grading.StatusAlert.Heading.peer.inProgress',
    defaultMessage: 'Peer in progress <TODO>',
    description: 'Peer Assessment closed status alert heading',
  },
  waiting: {
    id: 'ora-grading.StatusAlert.Heading.peer.waiting',
    defaultMessage: 'Peer waiting <TODO>',
    description: 'Peer Assessment waiting status alert heading',
  },
  finished: {
    id: 'ora-grading.StatusAlert.Heading.peer.finished',
    defaultMessage: 'Peer finished <TODO>',
    description: 'Peer Assessment finished status alert heading',
  },
  closed: {
    id: 'ora-grading.StatusAlert.Heading.peer.closed',
    defaultMessage: 'Peer closed <TODO>',
    description: 'Peer Assessment closed status alert heading',
  },
});

const done = defineMessages({
  status: {
    id: 'ora-grading.StatusAlert.Heading.done',
    defaultMessage: 'Graded <TODO>',
    description: 'Done status alert heading',
  },
});

export default {
  submission,
  studentTraining,
  self,
  peer,
  done,
};
