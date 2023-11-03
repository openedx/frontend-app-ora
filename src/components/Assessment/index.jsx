import React from 'react';

import { AssessmentContext } from 'context/AssessmentContext';

import EditableAssessment from './EditableAssessment';
import ReadonlyAssessment from './ReadonlyAssessment';

import './Assessment.scss';

/**
 * <Assessment />
 */
export const Assessment = () => {
  console.log("Assessment component");
  const { assessment } = React.useContext(AssessmentContext);
  React.useEffect(() => {
    console.log({ assessment });
  }, [assessment]);
  return assessment
    ? <ReadonlyAssessment assessment={assessment} defaultOpen />
    : <EditableAssessment />;
};
Assessment.propTypes = {};

export default Assessment;
