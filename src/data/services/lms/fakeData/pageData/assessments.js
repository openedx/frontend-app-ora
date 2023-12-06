import { stepNames } from 'constants';
import { progressKeys } from 'constants/mockData';

export const createAssessmentState = ({
  criteria = [],
  overall_feedback = '',
}) => ({
  criteria,
  overall_feedback,
});

const gradedState = createAssessmentState({
  criteria: new Array(4).fill(0).map((_, i) => ({
    feedback: `feedback ${i + 1}`,
    // random 0-3
    selectedOption: Math.floor(Math.random() * 4),
  })),
  overall_feedback: 'nice job',
});

export const getAssessmentState = ({ progressKey, stepConfig }) => {
  if (![progressKeys.graded, progressKeys.gradedSubmittedOnPreviousTeam].includes(progressKey)) {
    return null;
  }
  const out = {};
  out.effectiveAssessmentType = 'staff';
  if (stepConfig.includes(stepNames.staff)) {
    out.staff = {
      stepScore: { earned: 10, possible: 10 },
      assessment: gradedState,
    };
  }
  if (stepConfig.includes(stepNames.peer)) {
    out.peer = {
      stepScore: { earned: 10, possible: 10 },
      assessments: [
        gradedState,
        gradedState,
        gradedState,
        gradedState,
        gradedState,
      ],
    };
    out.peerUnweighted = {
      stepScore: null,
      assessments: [
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
