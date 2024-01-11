import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { useCriteriaConfig } from 'hooks/assessment';

import Feedback from './Feedback';
import messages from './messages';

const AssessmentCriteria = ({ criteria, overallFeedback, stepLabel }) => {
  const { formatMessage } = useIntl();
  const criteriaConfig = useCriteriaConfig();
  return (
    <>
      {criteriaConfig.map((rubricCriterion, i) => {
        const { selectedOption, feedback } = criteria[i];
        const option = rubricCriterion.options[selectedOption] || {};
        const commentHeader = stepLabel
          ? formatMessage(messages.stepComments, { step: stepLabel })
          : null;
        return (
          <Feedback
            key={rubricCriterion.name}
            criterionName={rubricCriterion.name}
            criterionDescription={rubricCriterion.description}
            selectedOption={option.label}
            selectedPoints={option.points}
            commentHeader={commentHeader}
            commentBody={feedback}
          />
        );
      })}

      {overallFeedback && (
        <>
          <hr />
          <Feedback
            criterionName={formatMessage(messages.overallFeedback)}
            commentHeader={stepLabel}
            commentBody={overallFeedback}
          />
        </>
      )}
    </>
  );
};
AssessmentCriteria.defaultProps = {
  stepLabel: null,
  overallFeedback: null,
};
AssessmentCriteria.propTypes = {
  criteria: PropTypes.arrayOf(
    PropTypes.shape({
      selectedOption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      // selectedPoints: PropTypes.number,
      feedback: PropTypes.string,
    }),
  ).isRequired,
  overallFeedback: PropTypes.string,
  stepLabel: PropTypes.string,
};

export default AssessmentCriteria;
