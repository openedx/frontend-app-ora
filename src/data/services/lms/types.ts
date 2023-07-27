export interface QueryStatus {
  isLoading: boolean,
  isFetching: boolean,
  isInitialLoading: boolean,
  error: unknown,
}

export interface QueryData<Response> extends QueryStatus {
  isLoading: boolean,
  isFetching: boolean,
  isInitialLoading: boolean,
  error: unknown,
  data: Response,
}

export interface CriterionConfig {
  name: string,
  description: string,
  feedbackEnabled: boolean,
  feedbackRequired: boolean,
  options: {
    name: string,
    points: number,
    description: string,
  }[],
}

export interface SubmissionConfig {
  startDatetime: number,
  endDatetime: number,
  textResponseConfig: {
    enabled: boolean,
    optional: boolean,
    editorType: 'text' | 'tinymce',
    allowLatexPreviews: boolean,
  },
  fileResponseConfig: {
    enabled: boolean,
    optional: boolean,
    fileUploadLimit: number,
    allowedExtensions: string[],
    blockedExtensions: string[],
    fileTypeDescription: string,
  },
  teamsConfig: {
    enabled: boolean,
    teamsetName: string,
  },
}

export interface ORAConfig {
  title: string,
  prompts: string[],
  baseAssetUrl: string,
  submissionConfig: SubmissionConfig,
  assessmentSteps: {
    order: string[],
    settings: {
      peer: {
        startTime: number,
        endTime: number,
        required: boolean,
        data: {
          minNumberToGrade: number,
          minNumberToBeGradedBy: number,
          enableFlexibleGrading: boolean,
        },
      },
      staff: {
        required: boolean,
      },
      self: {
        startTime: number,
        endTime: number,
        required: boolean,
      },
      training: {
        required: boolean,
        data: {
          examples: {
            response: string,
            criteria: { name: string, selection: string }[],
          }[],
        },
      },
    },
  },
  rubric: {
    showDuringResponse: boolean,
    feedbackConfig: {
      description: string,
      defaultText: string,
    },
    criteria: CriterionConfig[],
  },
  leaderboardConfig: {
    enabled: boolean,
    numberOfEntries: number,
  },
}
