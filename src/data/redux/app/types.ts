import * as apiTypes from 'data/services/lms/types';

export interface Assessment {
  submittedAssessment: apiTypes.AssessmentData | null,
  showTrainingError: boolean,
}

export interface Criterion {
  feedback?: string,
  selectedOption?: number,
}

export interface FormFields {
  criteria: Criterion[],
  overallFeedback: string,
}

export interface AssessmentAction { data: apiTypes.AssessmentData }

export type Response = string[] | null;

export interface CriterionAction {
  criterionIndex: number,
  option?: number,
  feedback?: string,
}

export interface AppState {
  assessment: Assessment,
  response: Response,
  tempResponse: Response,
  textResponses: string[],
  formFields: FormFields,
  hasSubmitted: boolean,
  showValidation: boolean,
  testDirty: boolean,
  testProgressKey?: string | null,
  testDataPath?: string | null,
}
