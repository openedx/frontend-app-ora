import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import CriterionContainer from '../components/CriterionContainer';
import { useReadonlyRubricData } from './hooks';
import messages from '../messages';

/**
 * <ReadonlyRubric />
 */
const ReadonlyRubric = ({ assessment }) => {
  const {
    criteria,
    overallFeedbackDisabled,
  } = useReadonlyRubricData({ assessment });

  const { formatMessage } = useIntl();
  return (
    <Card className="rubric-card">
      <Card.Section className="rubric-body">
        <h3>{formatMessage(messages.rubric)}</h3>
        <hr className="m-2.5" />
        {criteria.map((criterion) => (
          <CriterionContainer
            key={criterion.name}
            isGrading={false}
            criterion={{
              ...criterion,
              optionsValue: assessment.optionsSelected[criterion.name],
              feedbackValue: assessment.criterionFeedback[criterion.name],
            }}
          />
        ))}
        {!overallFeedbackDisabled && (
          <p>{assessment.overallFeedback}</p>
        )}
        <hr />
      </Card.Section>
    </Card>
  );
};

ReadonlyRubric.propTypes = {
  assessment: PropTypes.shape({
    optionsSelected: PropTypes.objectOf(PropTypes.string).isRequired,
    criterionFeedback: PropTypes.objectOf(PropTypes.string).isRequired,
    overallFeedback: PropTypes.string,
  }).isRequired,
};

export default ReadonlyRubric;
