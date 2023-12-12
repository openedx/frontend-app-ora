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
  closed: boolean,
  closedReason?: 'notAvailable' | 'pastDue',
}

export interface SubmissionTeamInfo {
  teamName: string,
  teamUsernames: string[],
  previousTeamName: string | null,
  hasSubmitted: boolean,
}

export interface SubmissionStepInfo extends StepClosedInfo {
  hasSubmitted: boolean,
  hasCancelled: boolean,
  cancelledBy: string,
  cancelledAt: number,
  teamInfo: SubmissionTeamInfo | null,
}

export interface StudentTrainingStepInfo extends StepClosedInfo {
  numberOfAssessmentsCompleted: number,
  expectedRubricSelctions: RubricSelection[],
}

export interface PeerStepInfo extends StepClosedInfo {
  numberOfAssessmentsCompleted: number,
  isWaitingForSubmissions: boolean,
  numberOfReceivedAssessments: number,
}

export interface StepInfo {
  submission: SubmissionStepInfo,
  peer: PeerStepInfo | null,
  studentTraining: StudentTrainingStepInfo | null,
  self: StepClosedInfo | null,
}

export interface ProgressData {
  activeStepName: 'studentTraining' | 'peer' | 'self' | 'staff',
  hasReceivedFinalGrade: boolean,
  receivedGrades: ReceivedGradesData,
  stepInfo: StepInfo,
}

export interface UploadedFile {
  fileUrl: string,
  fileDescription: string,
  fileName: string,
  fileSize: string,
  uploadedBy?: string,
  fileIndex?: number,
}

export interface ResponseData {
  textResponses: string[] | null,
  uploadedFiles: UploadedFile[] | null,
  teamUploadedFiles: UploadedFile[] | null,
}

// Assessments Data
export interface AssessmentData {
  criteria: {
    selectedOption: number | null,
    feedback: string,
  }[],
  overallFeedback: string | null,
  step?: string,
}

export interface AssessmentsData {
  effectiveAssessmentType: 'self' | 'peer' | 'staff',
  staff?: {
    stepScore: { earned: number, possible: number },
    assessment: AssessmentData,
  },
  peer: {
    stepScore: { earned: number, possible: number },
    assessments: AssessmentData[],
  },
  peerUnweighted?: {
    stepScore: null,
    assessments: AssessmentData[],
  },
  self?: {
    stepScore: { earned: number, possible: number },
    assessment: AssessmentData,
  },
}

export interface PageData {
  progress: ProgressData,
  response: ResponseData,
  assessment: AssessmentsData
}
