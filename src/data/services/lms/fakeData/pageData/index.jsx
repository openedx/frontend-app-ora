import progressStates from './progress';
import rubricStates from './rubric';
import submissionStates from './submission';

export const emptySubmission = {
  progress: progressStates.submission,
  rubric: rubricStates.criteriaFeedbackEnabled.empty,
  submission: submissionStates.emptySubmission,
};

export const peerAssessment = {
  progress: progressStates.peer(),
  rubric: rubricStates.criteriaFeedbackEnabled.empty,
  submission: submissionStates.individialSubmission,
};

export default {
  progressStates,
  rubricStates,
  submissionStates,
  shapes: {
    emptySubmission,
    peerAssessment,
  },
};
