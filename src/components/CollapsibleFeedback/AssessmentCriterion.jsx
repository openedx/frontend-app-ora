import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import Feedback from './Feedback';
import messages from './messages';
import { useORAConfigData } from 'data/services/lms/hooks/selectors';

const AssessmentCriterion = ({
  assessmentCriterions,
  overallFeedback,
  stepLabel,
}) => {
  const { formatMessage } = useIntl();
  const { rubricConfig } = useORAConfigData();
  return (
    <>
      {rubricConfig.criteria.map((criterion, i) => {
        const option = criterion.options[assessmentCriterions[i].selectedOption];
        return (
          <Feedback
            key={criterion.name}
            criterionName={criterion.name}
            criterionDescription={criterion.description}
            selectedOption={option.name}
            selectedPoints={option.points}
            commentHeader={stepLabel}
            commentBody={criterion.feedback}
          />
        );
      })}
      <Feedback
        criterionName={formatMessage(messages.overallFeedback)}
        commentHeader={stepLabel}
        commentBody={overallFeedback}
      />
    </>
  );
};
AssessmentCriterion.defaultProps = {};
AssessmentCriterion.propTypes = {
  assessmentCriterions: PropTypes.arrayOf(PropTypes.shape({
    selectedOption: PropTypes.number,
    // selectedPoints: PropTypes.number,
    feedback: PropTypes.string,
  })),
  overallFeedback: PropTypes.string,
  stepLabel: PropTypes.string.isRequired,
};

export default AssessmentCriterion;
