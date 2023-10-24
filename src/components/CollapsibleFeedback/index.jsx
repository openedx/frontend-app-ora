import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import Feedback from './Feedback';
import messages from './messages';

const CollapsibleFeedback = ({ assessment, stepScore, stepName }) => {
  const assessmentCriterions = assessment.assessmentCriterions;
  const { formatMessage } = useIntl();

  return (
    <Collapsible
      title={
        <h3>
          {formatMessage(messages.grade, {
            stepName,
          })}
          {stepScore && formatMessage(messages.gradePoints, stepScore)}
        </h3>
      }
    >
      {assessmentCriterions.map((criterion) => {
        return (
          <Feedback
            key={criterion.name}
            criterion={criterion.name}
            selectedOption={criterion.selectedOption}
            selectedPoints={criterion.selectedPoints}
            commentHeader={stepName}
            commentBody={criterion.feedback}
          />
        );
      })}
      <Feedback
        criterion={{ name: 'Overall Feedback' }}
        commentHeader={stepName}
        commentBody={assessment.overallFeedback}
      />
    </Collapsible>
  );
};
CollapsibleFeedback.defaultProps = {};
CollapsibleFeedback.propTypes = {
  // assessment: PropTypes.shape({
  //   overallFeedback: PropTypes.string,
  // }),
  stepName: PropTypes.string.isRequired,
};

export default CollapsibleFeedback;
