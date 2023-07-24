import { useQuery } from 'react-query';

import { queryKeys } from './constants';

const mockORAConfig = { fake: 'ora config data' };
const mockSubmissionData = { fake: 'ora submission data' };

/**
 *  A react-query data object
 *  @typedef {Object} ReactQueryData
 *  @property {boolean} isLoading
 *  @property {boolean} isFetching
 *  @property {boolean} isInitialLoading
 *  @property {Object} error
 *  @property {Object} data
 */

const loadAssessmentConfig = ({
  assessmentSteps: {
    peer,
    self,
    training,
    staff,
  },
}) => ({
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

const loadSubmissionConfig = ({
  submissionConfig: {
    textResponseConfig: text,
    fileReseponseConfig: file,
    teamsConfig,
    ...config
  },
}) => ({
  startDatetime: config.startDatetime,
  endDatetime: config.endDatetime,
  textResponseConfig: {
    enabled: text.enabled,
    optional: text.optional,
    editorType: text.editorType,
    allowLatexPreview: text.allowLatexPreview,
  },
  fileResponseConfig: {
    enabled: file.enabled,
    optional: file.optional,
    fileUploadType: file.fileUploadType,
    allowedExtensions: file.allowedExtensions,
    blockedExtensions: file.blockedExtensions,
    fileTypeDescription: file.fileTypeDescription,
  },
  teamsConfig: {
    enabled: teamsConfig.enabled,
    teamsetName: teamsConfig.teamsetName,
  },
});

const loadRubricConfig = ({ rubric }) => ({
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
    options: criterion.map(option => ({
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
const loadFile = (file) => ({
  url: file.fileUrl,
  description: file.fileDescription,
  name: file.fileName,
  size: file.fileSize,
  uploadedBy: file.uploadedBy,
});
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

/**
 * @return {ReactQueryData} ORA config data
 */
export const useORAConfig = () => {
  const { data, ...status } = useQuery({
    queryKey: [queryKeys.oraConfig],
    // queryFn: () => getAuthenticatedClient().get(...),
    queryFn: () => Promise.resolve(mockORAConfig),
  });
  return { ...status, data: loadORAConfigData(data) };
};

/**
 * @return {ReactQueryData} Learner Submission data
 */
export const useSubmissionData = () => {
  const { data, ...status } = useQuery({
    queryKey: [queryKeys.submissionData],
    // queryFn: () => getAuthenticatedClient().get(...),
    queryFn: () => Promise.resolve(mockSubmissionData),
  });
  return { ...status, data: loadSubmissionData(data) };
};
