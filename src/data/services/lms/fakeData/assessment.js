/* eslint-disable camelcase */
const submissionConfig = {
  start_datetime: '2023-04-14T20:00:00Z',
  end_datetime: '2023-04-14T20:00:00Z',
  text_response_config: {
    enabled: true,
    optional: true,
    // editor_type: (Enum) One of "text", "tinymce",
    editor_type: 'text',
    allow_latex_preview: true,
  },
  file_response_config: {
    enabled: true,
    optional: true,
    file_upload_limit: 1,
    allowed_extensions: ['pdf'],
    blocked_extensions: ['exe'],
    file_type_description: 'file type description',
  },
  teams_config: {
    enabled: true,
    teamset_name: 'teamset_name',
  },
};

const leaderboardConfig = {
  enabled: true,
  number_of_entries: 1,
};

const rubricConfig = {
  show_during_response: true,
  feedback_config: {
    description: 'Feedback description',
    default_text: 'Default feedback text',
  },
  criteria: [
    {
      name: 'Criterion name',
      description: 'Criterion description',
      feedback_enabled: true,
      feedback_required: true,
      options: [
        {
          name: 'Option name',
          points: 0,
          description: 'Option description',
        },
      ],
    },
  ],
};

const assessmentSteps = {
  order: ['practice', 'self', 'peer', 'staff'],
  settings: {
    peer: {
      start_time: '2023-04-14T20:00:00Z',
      end_time: '2023-04-14T20:00:00Z',
      required: true,
      // Additional fields per step
      data: {
        min_number_to_grade: 0,
        min_number_to_be_graded_by: 0,
        enable_flexible_grading: true,
      },
    },
    staff: {
      required: true,
    },
    self: {
      start_time: '2023-04-14T20:00:00Z',
      end_time: '2023-04-14T20:00:00Z',
      required: true,
    },
    training: {
      required: true,
      data: {
        examples: [
          {
            response: 'response',
            criteria: [
              {
                name: 'criterion name',
                feedback: 'feedback',
              },
            ],
          },
        ],
      },
    },
  },
};

export const createAssessment = ({
  title = 'Assessment title',
  prompts = ['<h1>ORA Prompt</h1>', '<p>ORA Prompt</p>'],
  base_asset_url = '/assets',
  submission_config = submissionConfig,
  assessment_steps = assessmentSteps,
  rubric = rubricConfig,
  leaderboard_config = leaderboardConfig,
} = {}) => ({
  title,
  prompts,
  base_asset_url,
  submission_config,
  assessment_steps,
  rubric,
  leaderboard_config,
});

export default {
  assessmentText: createAssessment(),
  assessmentTinyMCE: createAssessment({
    submission_config: {
      ...submissionConfig,
      text_response_config: {
        ...submissionConfig.text_response_config,
        editor_type: 'tinymce',
      },
    },
  }),
};
