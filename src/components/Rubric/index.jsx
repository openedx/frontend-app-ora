import React from 'react';
import PropTypes from 'prop-types';

import { Card, StatefulButton } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { MutationStatus } from 'data/services/lms/constants';
import CriterionContainer from './CriterionContainer';
import RubricFeedback from './RubricFeedback';

import { useRubricData } from './hooks';
import messages from './messages';

import './Rubric.scss';

/**
 * <Rubric />
 */
export const Rubric = ({ isGrading }) => {
  const {
    criteria,
    onSubmit,
    overallFeedbackPrompt,
    overallFeedback,
    overallFeedbackDisabled,
    onOverallFeedbackChange,
    submitStatus,
  } = useRubricData({
    isGrading,
  });

  const { formatMessage } = useIntl();
  return (
    <Card className="rubric-card">
      <Card.Section className="rubric-body">
        <h3>{formatMessage(messages.rubric)}</h3>
        <hr className="m-2.5" />
        {criteria.map((criterion) => (
          <CriterionContainer
            {...{ isGrading, key: criterion.name, criterion }}
          />
        ))}
        <hr />
        {isGrading && (
          <RubricFeedback
            {...{
              overallFeedbackPrompt,
              overallFeedback,
              overallFeedbackDisabled,
              onOverallFeedbackChange,
            }}
          />
        )}
      </Card.Section>
      {isGrading && (
        <div className="rubric-footer">
          <StatefulButton
            onClick={onSubmit}
            state={submitStatus}
            disabledStates={[MutationStatus.loading, MutationStatus.success]}
            labels={{
              [MutationStatus.idle]: formatMessage(messages.submitGrade),
              [MutationStatus.loading]: formatMessage(messages.submittingGrade),
              [MutationStatus.success]: formatMessage(messages.gradeSubmitted),
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
