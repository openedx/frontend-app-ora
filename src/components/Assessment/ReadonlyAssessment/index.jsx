import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import AssessmentCriteria from './AssessmentCriteria';
import CollapsibleAssessment from './CollapsibleAssessment';

const ReadOnlyAssessment = (stepData) => {
  const {
    stepLabel,
    step,
    stepScore,
    defaultOpen,
  } = stepData;
  const collapsibleProps = { stepLabel, stepScore, defaultOpen };
  console.log({ ReadOnlyAssessment: { stepData, collapsibleProps } });
  if (stepData.assessments) {
    return (
      <div className="my-2" key={step}>
        <CollapsibleAssessment {...collapsibleProps}>
          {stepData.assessments.map((assessment, index) => (
            <React.Fragment key={uuid()}>
              <p className="mb-0">{stepLabel} {index + 1}: </p>
              <AssessmentCriteria {...assessment} stepLabel={stepLabel} />
              <hr className="my-4" />
            </React.Fragment>
          ))}
        </CollapsibleAssessment>
      </div>
    );
  }
  return (
    <CollapsibleAssessment {...collapsibleProps}>
      <AssessmentCriteria {...stepData.assessment} stepLabel={stepLabel} />
    </CollapsibleAssessment>
  );
};
ReadOnlyAssessment.defaultProps = {
  defaultOpen: false,
  assessment: null,
  assessments: null,
  stepScore: null,
};
ReadOnlyAssessment.propTypes = {
  stepLabel: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  stepScore: PropTypes.shape({
    earned: PropTypes.number,
    total: PropTypes.number,
  }),
  defaultOpen: PropTypes.bool,
  assessment: PropTypes.shape({}),
  assessments: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ReadOnlyAssessment;
