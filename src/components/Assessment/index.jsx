import React from 'react';

import { useHasSubmitted, useInitializeAssessment } from 'hooks/assessment';

import EditableAssessment from './EditableAssessment';
import ReadonlyAssessment from './ReadonlyAssessment';

import './Assessment.scss';

/**
 * <Assessment />
 */
export const Assessment = () => {
  const hasAssessment = useHasSubmitted();
  useInitializeAssessment();
  return hasAssessment
    ? <ReadonlyAssessment defaultOpen />
    : <EditableAssessment />;
};
Assessment.propTypes = {};

export default Assessment;
