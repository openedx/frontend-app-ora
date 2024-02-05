import React from 'react';

import EditableAssessment from './EditableAssessment';
import ReadonlyAssessment from './ReadonlyAssessment';

import { useAssessmentData } from './useAssessmentData';

import './Assessment.scss';

/**
 * <Assessment />
 */
const Assessment = () => {
  const { initialized, hasSubmitted } = useAssessmentData();
  if (!initialized) {
    return null;
  }
  return hasSubmitted
    ? <ReadonlyAssessment defaultOpen />
    : <EditableAssessment />;
};
Assessment.propTypes = {};

export default Assessment;
