// Block Info fields
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

export interface TextResponseConfig {
  enabled: boolean,
  optional: boolean,
  editorType: 'text' | 'tinymce',
  allowLatexPreviews: boolean,
}

export interface FileResponseConfig {
  enabled: boolean,
  optional: boolean,
  fileUploadLimit: number,
  allowedExtensions: string[],
  blockedExtensions: string[],
  fileTypeDescription: string,
}

export interface SubmissionConfig {
  startDatetime: number,
  endDatetime: number,
  textResponseConfig: TextResponseConfig,
  fileResponseConfig: FileResponseConfig,
  teamsConfig: {
    enabled: boolean,
    teamsetName: string,
  },
}

export interface PeerStepSettings {
  startDatetime: number,
  endDatetime: number,
  required: boolean,
  data: {
    minNumberToGrade: number,
    minNumberToBeGradedBy: number,
    enableFlexibleGrading: boolean,
  },
}

export interface StaffStepSettings {
  required: boolean,
}

export interface SelfStepSettings {
  startDatetime: number,
  endDatetime: number,
  required: boolean,
}

export interface TrainingStepSettings {
  required: boolean,
  data: {
    examples: {
      response: string,
      criteria: { name: string, selection: string }[],
    }[],
  },
}

export interface AssessmentStepConfig {
  order: string[],
  settings: {
    peer: PeerStepSettings,
    staff: StaffStepSettings,
    self: SelfStepSettings,
    training: TrainingStepSettings
  },
}

export interface RubricConfig {
  showDuringResponse: boolean,
  feedbackConfig: {
    description: string,
    defaultText: string,
  },
  criteria: CriterionConfig[],
}

export interface LeaderboardConfig {
  enabled: boolean,
  numberOfEntries: number,
}

export interface ORAConfig {
  title: string,
  prompts: string[],
  baseAssetUrl: string,
  submissionConfig: SubmissionConfig,
  assessmentSteps: AssessmentStepConfig,
  rubricConfig: RubricConfig,
  leaderboardConfig: LeaderboardConfig,
}
