/* eslint-disable camelcase */
const createFiles = (numFiles) => new Array(numFiles).map((_, i) => ({
  file_url: `https://placehold.co/600x400?text=File+${i}`,
  file_name: `file_name_${i}`,
  file_description: 'file_description',
  file_size: 100,
  file_index: 0,
}));

const createTeamInfo = ({
  team_name = 'Team name',
  team_usernames = ['user1', 'user2'],
  previous_team_name = 'Previous team name',
  has_submitted = false,
  team_uploaded_files = createFiles(3),
} = {}) => ({
  team_name,
  team_usernames,
  previous_team_name,
  has_submitted,
  team_uploaded_files,
});

const createSubmissionStatus = ({
  has_submitted = true,
  has_cancelled = true,
  has_recieved_grade = true,
} = {}) => ({
  has_submitted,
  has_cancelled,
  has_recieved_grade,
});

const createSubmissionResponse = ({
  text_responses = ['Response 1', 'Response 2'],
  uploaded_files = createFiles(2),
} = {}) => ({
  text_responses,
  uploaded_files,
});

const createSubmission = ({
  team_info = createTeamInfo(),
  submission_status = createSubmissionStatus(),
  submission = createSubmissionResponse(),
}) => ({
  team_info,
  submission_status,
  submission,
});

export default {
  individialAssessment: createSubmission({
    team_info: {},
    submission_status: createSubmissionStatus(),
    submission: createSubmissionResponse(),
  }),
  teamAssessment: createSubmission(),
};
