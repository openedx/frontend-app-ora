// ORA Config loaders
export const loadAssessmentConfig = ({
  assessmentSteps: {
    order,
    settings: {
      peer,
      self,
      training,
      staff,
    },
  },
}) => ({
  order,
  peer: peer && {
    startTime: peer.startTime,
    endTime: peer.endTime,
    required: peer.required,
    data: {
      minNumberToGrade: peer.data.minNumberToGrade,
      minNumberToBeGradedBy: peer.data.minNumberToBeGradedBy,
      enableFlexibleGrading: peer.data.enableFlexibleGrading,
    },
  },
  self: self && {
    startTime: self.startTime,
    endTime: self.endTime,
    required: self.required,
  },
  training: training && {
    required: training.required,
    data: { examples: training.data.examples },
  },
  staff: staff && { required: staff.required },
});

export const loadSubmissionConfig = ({
  submissionConfig: {
    textResponseConfig: text,
    fileResponseConfig: file,
    teamsConfig,
    ...config
  },
}) => ({
  startDatetime: config.startDatetime,
  endDatetime: config.endDatetime,
  textResponseConfig: text && {
    enabled: text.enabled,
    optional: text.optional,
    editorType: text.editorType,
    allowLatexPreview: text.allowLatexPreview,
  },
  fileResponseConfig: file && {
    enabled: file.enabled,
    optional: file.optional,
    fileUploadType: file.fileUploadType,
    allowedExtensions: file.allowedExtensions,
    blockedExtensions: file.blockedExtensions,
    fileTypeDescription: file.fileTypeDescription,
  },
  teamsConfig: teamsConfig && {
    enabled: teamsConfig.enabled,
    teamsetName: teamsConfig.teamsetName,
  },
});

export const loadRubricConfig = ({ rubric }) => ({
  showDuringResponse: rubric.showDuringResponse,
  feedbackConfig: {
    description: rubric.feedbackConfig.description,
    defaultText: rubric.feedbackConfig.defaultText,
  },
  criteria: rubric.criteria.map(criterion => ({
    name: criterion.name,
    description: criterion.description,
    feedbackEnabled: criterion.feedbackEnabled,
    feedbackRequired: criterion.feedbackRequired,
    options: criterion.options.map(option => ({
      name: option.name,
      points: option.points,
      description: option.description,
    })),
  })),
});

export const loadORAConfigData = (data) => ({
  title: data.title,
  prompts: data.prompts,
  baseAssetUrl: data.baseAssetUrl,
  submissionConfig: loadSubmissionConfig(data),
  assessmentSteps: loadAssessmentConfig(data),
  rubric: loadRubricConfig(data),
  leaderboardConfig: {
    enabled: data.leaderboardConfig.enabled,
    numberOfEntries: data.leaderboardConfig.numberOfEntries,
  },
});

// Submission loaders
export const loadFile = (file) => {
  return {
    url: file.fileUrl,
    description: file.fileDescription,
    name: file.fileName,
    size: file.fileSize,
    uploadedBy: file.uploadedBy,
  };
};

export const loadSubmissionData = ({ teamInfo, submissionStatus, submission }) => ({
  teamInfo: {
    teamName: teamInfo.teamName,
    teamUsernames: teamInfo.teamUsernames,
    previousTeamName: teamInfo.previousTeamName,
    hasSubmitted: teamInfo.hasSubmitted,
    uploadedFiles: teamInfo.teamUploadedFiles.map(loadFile),
  },
  submissionStatus: {
    hasSubmitted: submissionStatus.hasSubmitted,
    hasCancelled: submissionStatus.hasCancelled,
    hasReceivedGrade: submissionStatus.hasReceivedGrade,
  },
  submission: {
    textResponses: submission.textResponses,
    uploadedFiles: submission.uploadedFiles.map(loadFile),
  },
});
