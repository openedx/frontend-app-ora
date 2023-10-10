// Progress data
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

export interface StepClosedInfo {
  isClosed: boolean,
  closedReason?: 'notAvailable' | 'pastDue',
}

export interface LearnerTrainingStepInfo extends StepClosedInfo {
  numberOfAssessmentsCompleted: number,
  expectedRubricSelctions: RubricSelection[],
}

export interface PeerStepInfo extends StepClosedInfo {
  numberOfAssessmetsCompleted: number,
  isWaitingForSubmissions: boolean,
  numberOfReceivedAssessments: number,
}

export interface StepInfo {
  peer: PeerStepInfo | null,
  learnerTraining: LearnerTrainingStepInfo | null,
  self: StepClosedInfo | null,
}

export interface ProgressData {
  activeStepName: 'training' | 'peer' | 'self' | 'staff',
  hasReceivedFinalGrade: boolean,
  receivedGrades: ReceivedGradesData,
  stepInfo: StepInfo,
}

// Submission Data
export interface SubmissionStatusData extends StepClosedInfo {
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

// Assessments Data
export interface AssessmentData {
  optionsSelected: { [key: string]: string | null },
  criterionFeedback: { [key: string]: string },
  overallFeedback: string | null,
}

export interface AssessmentsData {
  effectiveAssessmentType: 'staff' | 'peer' | 'self',
  assessments: {
    staff?: {
      stepScore: { earned: number, possible: number },
      assessment: AssessmentData,
    },
    peer?: {
      stepScore: { earned: number, possible: number },
      assessments: AssessmentData[],
    },
    peerUnweighted?: {
      stepScore: null,
      assessmenst: AssessmentData[],
    },
    self?: {
      stepScore: { earned: number, possible: number },
      assessment: AssessmentData,
    },
  },
}

export interface PageData {
  progress: ProgressData,
  submission: SubmissionData,
  assessments: AssessmentsData
}
