import React from 'react';
import PropTypes from 'prop-types';

import { useHasSubmitted } from 'hooks/app';
import { useSubmittedAssessment } from 'hooks/assessment';
import ReadOnlyAssessment from './ReadOnlyAssessment';

/*
 * If called manually, will include step data and manually passed assessment(s).
 * If called as part of Assessment base component, will display the submitted assessment.
 */
const ReadOnlyAssessmentContainer = (props) => {
  const hasSubmitted = useHasSubmitted();
  const submittedAssessment = useSubmittedAssessment();
  return (
    <ReadOnlyAssessment
      {...props}
      {...hasSubmitted && { assessment: submittedAssessment }}
    />
  );
};
ReadOnlyAssessment.defaultProps = {
  defaultOpen: false,
  assessment: null,
  assessments: null,
  stepScore: null,
  stepLabel: null,
  step: null,
};
ReadOnlyAssessment.propTypes = {
  stepLabel: PropTypes.string,
  step: PropTypes.string,
  stepScore: PropTypes.shape({
    earned: PropTypes.number,
    total: PropTypes.number,
  }),
  defaultOpen: PropTypes.bool,
  assessment: PropTypes.shape({}),
  assessments: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ReadOnlyAssessmentContainer;
