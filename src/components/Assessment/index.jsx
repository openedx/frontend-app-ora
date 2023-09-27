import React from 'react';
import PropTypes from 'prop-types';

import EditableAssessment from './EditableAssessment';
import ReadonlyAssessment from './ReadonlyAssessment';

import './Assessment.scss';

/**
 * <Assessment />
 */
export const Assessment = ({ assessment, getValues }) => (assessment
  ? <ReadonlyAssessment />
  : <EditableAssessment getValues={getValues} />);

Assessment.defaultProps = {
  assessment: null,
};
Assessment.propTypes = {
  getValues: PropTypes.func.isRequired,
  assessment: PropTypes.shape({
    optionsSelected: PropTypes.objectOf(PropTypes.string).isRequired,
    criterionFeedback: PropTypes.objectOf(PropTypes.string).isRequired,
    overallFeedback: PropTypes.string,
  }),
};

export default Assessment;
