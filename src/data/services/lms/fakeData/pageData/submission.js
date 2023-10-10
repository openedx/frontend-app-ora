/* eslint-disable camelcase */
import { StrictDict } from '@edx/react-unit-test-utils';
import { closedStates } from './progress';

/// Submission
export const createFiles = (numFiles) => Array.from(Array(numFiles)).map((_, i) => ({
  file_url: `https://placehold.co/600x400?text=File+${i}`,
  file_name: `file_name_${i}`,
  file_description: 'file_description',
  file_size: 100,
  file_index: 0,
}));

export const createTeamInfo = ({
  team_name = 'Team name',
  team_usernames = ['user1', 'user2'],
  previous_team_name = 'Previous team name',
  has_submitted = false,
  team_uploaded_files = null,
} = {}) => ({
  team_name,
  team_usernames,
  previous_team_name,
  has_submitted,
  team_uploaded_files: team_uploaded_files || createFiles(3),
});

export const createSubmissionStatus = ({
  has_submitted = true,
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

export default StrictDict({
  emptySubmission: createSubmission({
    teamInfo: {},
    submissionStatus: createSubmissionStatus({
      has_submitted: false,
      has_cancelled: false,
      has_received_grade: false,
    }),
    response: createSubmissionResponse({
      text_responses: ['', ''],
      uploaded_files: [],
    }),
  }),
  individualSubmission: createSubmission({
    team_info: {},
    submission_status: createSubmissionStatus(),
    response: createSubmissionResponse(),
  }),
  teamSubmission: createSubmission(),
});
