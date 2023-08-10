export interface ReceivedGradeData {
  earned: number,
  possible: number,
}

export interface ReceivedGradesData {
  peer: ReceivedGradeData,
  staff: ReceivedGradeData,
}

export interface RubricSelection {
  name: string,
  selection: string,
}

export interface LearnerTrainingStepInfo {
  numberOfAssessmentsCompleted: number,
  expectedRubricSelctions: RubricSelection[],
}

export interface PeerStepInfo {
  numberOfAssessmetsCompleted: number,
  isWaitingForSubmissions: boolean,
  numberOfReceivedAssessments: number,
}

export interface ActiveStepInfo extends LearnerTrainingStepInfo, PeerStepInfo {}

export interface ProgressData {
  activeStepName: 'training' | 'peer' | 'self' | 'staff',
  hasReceivedFinalGrade: boolean,
  receivedGrades: ReceivedGradesData,
  activeStepInfo: ActiveStepInfo,
}

export interface SubmissionStatusData {
  hasSubmitted: boolean,
  hasCancelled: boolean,
  hasReceivedGrade: boolean,
}

export interface UploadedFile {
  fileUrl: string,
  fileDescription: string,
  fileName: string,
  fileSize: string,
  uploadedBy?: string,
  fileIndex?: number,
}

export interface SubmissionTeamData {
  teamName: string,
  teamUsernames: string[],
  previousTeamName: string | null,
  hasSubmitted: boolean,
  teamUploadedFiles: UploadedFile[],
}

export interface SubmissionResponseData {
  textResponses: string[],
  uploadedFiles: UploadedFile[],
}

export interface SubmissionData extends SubmissionStatusData {
  teamInfo: SubmissionTeamData,
  response: SubmissionResponseData,
}

export interface RubricData {
  optionsSelected: { [key: string]: string | null },
  criterionFeedback: { [key: string]: string },
  overallFeedback: string | null,
}

export interface PageData {
  progress: ProgressData,
  submission: SubmissionData,
  rubric: RubricData,
}
