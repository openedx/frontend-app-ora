import React from 'react';
import PropTypes from 'prop-types';

import { Card, StatefulButton } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { StrictDict } from '@edx/react-unit-test-utils';

import { useRubricConfig } from 'data/services/lms/hooks/selectors';

import CriterionContainer from './CriterionContainer';
import RubricFeedback from './RubricFeedback';

import messages from './messages';

import './Rubric.scss';

export const ButtonStates = StrictDict({
  default: 'default',
  pending: 'pending',
  complete: 'complete',
  error: 'error',
});

/**
 * <Rubric />
 */
export const Rubric = ({ isGrading }) => {
  const { criteria } = useRubricConfig();
  const { formatMessage } = useIntl();
  return (
    <Card className="rubric-card">
      <Card.Section className="rubric-body">
        <h3>{formatMessage(messages.rubric)}</h3>
        <hr className="m-2.5" />
        {criteria.map(criterion => (
          <CriterionContainer {...{ isGrading, key: criterion.name, criterion }} />
        ))}
        <hr />
        {isGrading && <RubricFeedback />}
      </Card.Section>
      {isGrading && (
        <div className="rubric-footer">
          <StatefulButton
            onClick={() => ({})}
            state="default"
            disabledStates={['pending', 'complete']}
            labels={{
              [ButtonStates.default]: formatMessage(messages.submitGrade),
              [ButtonStates.pending]: formatMessage(messages.submittingGrade),
              [ButtonStates.complete]: formatMessage(messages.gradeSubmitted),
            }}
          />
        </div>
      )}
    </Card>
  );
};
Rubric.propTypes = {
  isGrading: PropTypes.bool.isRequired,
};

export default Rubric;
