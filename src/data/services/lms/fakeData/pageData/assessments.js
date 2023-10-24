import { stepNames } from 'data/services/lms/constants';
import { progressKeys } from '../constants';

export const createAssessmentState = ({
  assessment_criterions = [],
  overall_feedback = '',
}) => ({
  assessment_criterions,
  overall_feedback,
});

const gradedState = createAssessmentState({
  assessment_criterions: new Array(4).fill(0).map((_, i) => ({
    name: `Criterion ${i + 1} name`,
    selectedOption: `Option ${i + 1} name`,
    selectedPoints: i,
    feedback: `feedback ${i + 1}`,
  })),
  overall_feedback: 'nice job',
});

export const getAssessmentState = ({ progressKey, stepConfig }) => {
  if (![progressKeys.graded, progressKeys.gradedSubmittedOnPreviousTeam].includes(progressKey)) {
    return null;
  }
  const out = {};
  if (stepConfig.includes(stepNames.staff)) {
    out.staff = {
      stepScore: { earned: 10, possible: 10 },
      assessment: gradedState,
    };
  }
  if (stepConfig.includes(stepNames.peer)) {
    out.peer = {
      stepScore: { earned: 10, possible: 10 },
      assessment: [
        gradedState,
        gradedState,
        gradedState,
        gradedState,
        gradedState,
      ],
    };
    out.peerUnweighted = {
      stepScore: null,
      assessment: [
        gradedState,
        gradedState,
        gradedState,
      ],
    };
  }
  if (stepConfig.includes(stepNames.self)) {
    out.self = {
      stepScore: { earned: 10, possible: 10 },
      assessment: gradedState,
    };
  }
  return out;
};

export default { getAssessmentState };
