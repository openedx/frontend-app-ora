import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import Feedback from './Feedback';
import messages from './messages';

const AssessmentCriterion = ({ assessmentCriterions, overallFeedback, stepName }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      {assessmentCriterions.map((criterion) => {
        return (
          <Feedback
            key={criterion.name}
            criterionName={criterion.name}
            selectedOption={criterion.selectedOption}
            selectedPoints={criterion.selectedPoints}
            commentHeader={stepName}
            commentBody={criterion.feedback}
          />
        );
      })}
      <Feedback
        criterionName={formatMessage(messages.overallFeedback)}
        commentHeader={stepName}
        commentBody={overallFeedback}
      />
    </>
  );
};
AssessmentCriterion.defaultProps = {};
AssessmentCriterion.propTypes = {
  assessmentCriterions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    selectedOption: PropTypes.string,
    selectedPoints: PropTypes.number,
    feedback: PropTypes.string,
  })),
  overallFeedback: PropTypes.string,
  stepName: PropTypes.string.isRequired,
};

export default AssessmentCriterion;
