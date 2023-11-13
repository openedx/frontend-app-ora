import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import AssessmentCriteria from './AssessmentCriteria';
import CollapsibleAssessment from './CollapsibleAssessment';

const ReadOnlyAssessment = ({
  assessment,
  assessments,
  stepLabel,
  stepScore,
  defaultOpen,
  step,
}) => {
  const collapsibleProps = { stepLabel, stepScore, defaultOpen };
  if (assessments) {
    return (
      <div className="my-2" key={step}>
        <CollapsibleAssessment {...collapsibleProps}>
          {assessments.map((mappedAssessment, index) => (
            <React.Fragment key={uuid()}>
              <p className="mb-0">{stepLabel} {index + 1}: </p>
              <AssessmentCriteria {...mappedAssessment} stepLabel={stepLabel} />
              <hr className="my-4" />
            </React.Fragment>
          ))}
        </CollapsibleAssessment>
      </div>
    );
  }
  return (
    <CollapsibleAssessment {...collapsibleProps}>
      <AssessmentCriteria {...assessment} stepLabel={stepLabel} />
    </CollapsibleAssessment>
  );
};
ReadOnlyAssessment.defaultProps = {
  defaultOpen: false,
  assessment: null,
  assessments: null,
  stepScore: null,
  step: null,
  stepLabel: null,
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

export default ReadOnlyAssessment;
