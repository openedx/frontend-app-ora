/* eslint-disable camelcase */
import { StrictDict } from '@edx/react-unit-test-utils';

import { closedStates, progressKeys } from '../constants';

const files = [
  {
    file_name: 'test.png',
    file_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png',
    file_description: 'test description',
  },
  {
    file_name: 'test.txt',
    file_url: 'https://raw.githubusercontent.com/openedx/edx-ora2/master/README.rst',
    file_description: 'test description',
  },
  {
    file_name: 'test.pdf',
    file_url: 'https://raw.githubusercontent.com/py-pdf/sample-files/main/004-pdflatex-4-pages/pdflatex-4-pages.pdf',
    file_description: 'test description',
  },
  {
    file_name: 'error.pdf',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_description: 'failed to load',
  },
];

const users = ['user1', 'user2', 'user3', 'user4'];

/// Submission
export const createFiles = (numFiles, { isTeam = false } = {}) => Array.from(Array(numFiles)).map(
  (_, i) => ({
    ...files[i],
    file_size: 100,
    file_index: i,
    uploaded_by: isTeam ? users[0] : users[numFiles % i],
  }),
);

export const createTeamInfo = ({
  team_name = 'Team name',
  team_usernames = ['user1', 'user2'],
  previous_team_name = null,
  has_submitted = false,
  team_uploaded_files = null,
} = {}) => ({
  team_name,
  team_usernames,
  previous_team_name,
  has_submitted,
  team_uploaded_files: team_uploaded_files || createFiles(3, { isTeam: true }),
});

export const createSubmissionStatus = ({
  has_submitted = false,
  has_cancelled = false,
  has_recieved_grade = false,
  closedState = closedStates.open,
} = {}) => ({
  ...closedState,
  has_submitted,
  has_cancelled,
  has_recieved_grade,
});

export const createSubmissionResponse = ({
  text_responses = ['Response 1', 'Response 2'],
  uploaded_files = null,
} = {}) => ({
  text_responses,
  uploaded_files: uploaded_files || createFiles(2),
});

export const createSubmission = ({
  teamInfo = createTeamInfo(),
  submissionStatus = createSubmissionStatus(),
  response = createSubmissionResponse(),
} = {}) => ({
  team_info: teamInfo,
  response,
  ...submissionStatus,
});

export const states = StrictDict({
  individual: StrictDict({
    cancelled: createSubmission({
      teamInfo: {},
      submissionStatus: createSubmissionStatus({ has_cancelled: true }),
      response: null,
    }),
    empty: createSubmission({
      teamInfo: {},
      response: createSubmissionResponse({
        text_responses: ['', ''],
        uploaded_files: [],
      }),
    }),
    saved: createSubmission({ team_info: {} }),
    submitted: createSubmission({
      team_info: {},
      submissionStatus: createSubmissionStatus({ has_submitted: true }),
    }),
    cancelledAfterSubmission: createSubmission({
      teamInfo: {},
      submissionStatus: createSubmissionStatus({ hasCancelled: true, hasSubmitted: true }),
    }),
  }),

  team: StrictDict({
    cancelled: createSubmission({
      submissionStatus: createSubmissionStatus({ has_cancelled: true }),
      response: null,
    }),
    empty: createSubmission({
      response: createSubmissionResponse({
        text_responses: ['', ''],
        uploaded_files: [],
      }),
    }),
    saved: createSubmission(),
    submitted: createSubmission({
      submissionStatus: createSubmissionStatus({ has_submitted: true }),
      team_info: createTeamInfo({ has_submitted: true }),
    }),
    cancelledAfterSubmission: createSubmission({
      submissionStatus: createSubmissionStatus({ hasCancelled: true, hasSubmitted: true }),
      team_info: createTeamInfo({ has_submitted: true }),
    }),
    teamAlreadySubmitted: createSubmission({
      team_info: createTeamInfo({ has_submitted: true }),
      response: null,
    }),
    submittedOnOtherTeam: createSubmission({
      teamInfo: createTeamInfo({ previous_team_name: 'Previous Team' }),
    }),
  }),
});

export const getSubmissionState = ({ progressKey, isTeam }) => {
  if ([
    progressKeys.cancelledDuringSubmission,
    progressKeys.submissionEarly,
    progressKeys.submissionClosed,
    progressKeys.submissionTeamAlreadySubmitted,
    progressKeys.submissionNeedTeam,
  ].includes(progressKey)) {
    return {};
  } // no submission info for these views

  if (!isTeam) {
    if ([
      progressKeys.cancelledDuringStudentTraining,
      progressKeys.cancelledDuringSubmission,
      progressKeys.cancelledDuringStudentTraining,
      progressKeys.cancelledDuringSelf,
      progressKeys.cancelledDuringPeer,
      progressKeys.cancelledDuringStaff,
    ].includes(progressKey)) {
      return states.individual.cancelled;
    }

    const mapped = {
      [progressKeys.submissionUnsaved]: states.individual.empty,
      [progressKeys.submissionSaved]: states.individual.saved,
    };
    if (progressKey in mapped) {
      return mapped[progressKey];
    }
    return states.individual.submitted;
  }

  if ([
    progressKeys.cancelledDuringStudentTraining,
    progressKeys.cancelledDuringSubmission,
    progressKeys.cancelledDuringStudentTraining,
    progressKeys.cancelledDuringSelf,
    progressKeys.cancelledDuringPeer,
    progressKeys.cancelledDuringStaff,
  ].includes(progressKey)) {
    return states.team.cancelled;
  }
  const mapped = {
    [progressKeys.submissionUnsaved]: states.team.empty,
    [progressKeys.submissionSaved]: states.team.saved,
    [progressKeys.teamAlreadySubmitted]: states.team.teamAlreadySubmitted,
    [progressKeys.submissionSaved]: states.team.saved,
    [progressKeys.gradedSubmittedOnPreviousTeam]: states.team.submittedOnOtherTeam,
  };
  if (progressKey in mapped) {
    return mapped[progressKey];
  }
  return states.team.submitted;
};

export default StrictDict({
  getSubmissionState,
});
