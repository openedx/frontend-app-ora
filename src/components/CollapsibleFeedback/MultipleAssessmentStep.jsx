import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CollapsibleFeedback from './CollapsibleFeedback';
import AssessmentCriterion from './AssessmentCriterion';

const MultipleAssessmentStep = ({
  stepLabel,
  step,
  stepScore,
  assessments,
  defaultOpen,
}) => (
  <div className='my-2' key='peer'>
    <CollapsibleFeedback stepLabel={stepLabel} stepScore={stepScore} defaultOpen={defaultOpen}>
      {assessments?.map((assessment, index) => (
        <Fragment key={index}>
          <p className='mb-0'>
            {stepLabel} {index + 1}:
          </p>
          <AssessmentCriterion {...assessment} stepLabel={stepLabel} />
          <hr className='my-4' />
        </Fragment>
      ))}
    </CollapsibleFeedback>
  </div>
);

MultipleAssessmentStep.defaultProps = {
  defaultOpen: false,
};
MultipleAssessmentStep.propTypes = {
  stepLabel: PropTypes.string.isRequired,
  stepScore: PropTypes.shape({
    earned: PropTypes.number,
    possible: PropTypes.number,
  }),
  assessments: PropTypes.arrayOf(
    PropTypes.shape({
      selectedOption: PropTypes.number,
      // selectedPoints: PropTypes.number,
      feedback: PropTypes.string,
    })
  ),
  defaultOpen: PropTypes.bool,
};

export default MultipleAssessmentStep;
