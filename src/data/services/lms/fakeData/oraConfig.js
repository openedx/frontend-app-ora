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

const genOption = (index, points) => ({
  name: `Option ${index + 1} name`,
  description: `Option ${index + 1} description`,
  points,
});

const genOptions = pointsArray => pointsArray.map((points, index) => genOption(index, points));
const genCriterion = ({ index, config, optionPointsArray }) => ({
  name: `Criterion ${index + 1} name`,
  description: `Criterion ${index + 1} description`,
  ...config,
  options: genOptions(optionPointsArray),
});

const rubricConfig = {
  show_during_response: true,
  feedback_config: {
    description: 'Feedback description',
    default_text: 'Default feedback text',
  },
  criteria: [
    genCriterion({
      index: 0,
      config: { feedback_enabled: true, feedback_required: true },
      optionPointsArray: [0, 2, 5, 7],
    }),
    genCriterion({
      index: 1,
      config: { feedback_enabled: true, feedback_required: false },
      optionPointsArray: [0, 2, 5, 7],
    }),
    genCriterion({
      index: 2,
      config: { feedback_enabled: true, feedback_required: false },
      optionPointsArray: [0, 2, 5, 7],
    }),
    genCriterion({
      index: 3,
      config: { feedback_enabled: true, feedback_required: false },
      optionPointsArray: [0, 2, 5, 7],
    }),
  ],
};

export const assessmentSteps = {
  order: ['studentTraining', 'self', 'peer', 'staff'],
  settings: {
    peer: {
      start_datetime: '2023-04-14T20:00:00Z',
      end_datetime: '2023-04-14T20:00:00Z',
      required: true,
      min_number_to_grade: 2,
      min_number_to_be_graded_by: 3,
      enable_flexible_grading: true,
    },
    staff: {
      required: true,
    },
    self: {
      start_datetime: '2023-04-14T20:00:00Z',
      end_datetime: '2023-04-14T20:00:00Z',
      required: true,
    },
    student_training: {
      required: true,
      number_of_examples: 2,
    },
  },
};

export const promptBody = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque finibus sem in aliquam. Cras volutpat ipsum sit amet porttitor bibendum. Nunc tempor ex neque, sed faucibus nisl accumsan vitae. Proin et sem nisl. Aenean placerat justo a ligula eleifend, in imperdiet sem sodales. Maecenas eget aliquet purus, ac ornare risus. Nullam eget interdum erat. Mauris semper porta sapien et egestas. Aliquam viverra convallis pulvinar. Aliquam suscipit ligula felis, eu viverra ligula dignissim ut. Vivamus sit amet commodo sem. Nullam a viverra nibh.
`;
export const createORAConfig = ({
  title = 'Assessment title',
  prompts = [`<div><p><b>ORA Prompt 1</b></p>${promptBody}</div>`, `<div><p><b>ORA Prompt 2</b></p>${promptBody}</div>`],
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
  rubricConfig: rubric,
  leaderboard_config,
});

export const tinyMCEConfig = {
  submission_config: {
    ...submissionConfig,
    text_response_config: {
      ...submissionConfig.text_response_config,
      editor_type: 'tinymce',
    },
  },
};

export default {
  assessmentText: createORAConfig(),
  assessmentTinyMCE: createORAConfig(tinyMCEConfig),
  assessmentStaffAfterSubmission: createORAConfig({
    assessment_steps: { ...assessmentSteps, order: ['staff'] },
  }),
  assessmentStaffAfterSelf: createORAConfig({
    assessment_steps: { ...assessmentSteps, order: ['self', 'staff'] },
  }),
};
