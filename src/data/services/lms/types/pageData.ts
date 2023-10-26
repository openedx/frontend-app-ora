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
  submission: SubmissionStepInfo,
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
  optionsSelected: { [key: string]: string | null },
  criterionFeedback: { [key: string]: string },
  assessmentCriterions: {
    name: string,
    selectedOption: string | null,
    selectedPoints: number | null,
    feedback: string,
  }[],
  overallFeedback: string | null,
}

export interface AssessmentsData {
  effectiveAssessmentType: 'self' | 'peer' | 'staff',
  assessments: {
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
  },
}

export interface PageData {
  progress: ProgressData,
  response: ResponseData,
  assessments: AssessmentsData
}
