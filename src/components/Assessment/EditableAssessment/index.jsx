import React from 'react';

import { Card, StatefulButton } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { MutationStatus } from 'data/services/lms/constants';
import CriterionContainer from '../components/CriterionContainer';
import OverallFeedback from '../components/OverallFeedback';

import useEditableAssessmentData from './hooks';
import messages from '../messages';

/**
 * <Rubric />
 */
const EditableAssessment = () => {
  const {
    criteria,
    formFields,
    onSubmit,
    submitStatus,
    overallFeedbackPrompt,
  } = useEditableAssessmentData();

  const { formatMessage } = useIntl();
  return (
    <Card className="rubric-card">
      <Card.Section className="rubric-body">
        <h3>{formatMessage(messages.rubric)}</h3>
        <hr className="m-2.5" />
        {criteria.map((criterion) => (
          <CriterionContainer
            isGrading
            {...{
              key: criterion.name,
              criterion: { ...criterion, ...formFields.criteria[criterion.name] },
            }}
          />
        ))}
        <hr />
        <OverallFeedback prompt={overallFeedbackPrompt} {...formFields.overallFeedback} />
      </Card.Section>
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
    </Card>
  );
};

EditableAssessment.propTypes = {

};

export default EditableAssessment;