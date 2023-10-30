import React from 'react';
import PropTypes from 'prop-types';

import CollapsibleFeedback from './CollapsibleFeedback';
import AssessmentCriterion from './AssessmentCriterion';

const SingleAssessmentStep = ({
  stepLabel,
  step,
  stepScore,
  assessment,
  defaultOpen,
}) => (
  <CollapsibleFeedback
    stepLabel={stepLabel}
    stepScore={stepScore}
    defaultOpen={defaultOpen}
  >
    <AssessmentCriterion {...assessment} stepLabel={stepLabel} />
  </CollapsibleFeedback>
);

SingleAssessmentStep.defaultProps = {
  defaultOpen: false,
};
SingleAssessmentStep.propTypes = {
  stepLabel: PropTypes.string.isRequired,
  stepScore: PropTypes.shape({
    earned: PropTypes.number,
    possible: PropTypes.number,
  }),
  assessment: PropTypes.shape({
    selectedOption: PropTypes.number,
    // selectedPoints: PropTypes.number,
    feedback: PropTypes.string,
  }),
  defaultOpen: PropTypes.bool,
};

export default SingleAssessmentStep;
