import React from 'react';

import { Card } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import CriterionContainer from 'components/CriterionContainer';
import RadioCriterion from 'components/CriterionContainer/RadioCriterion';
import CriterionFeedback from 'components/CriterionContainer/CriterionFeedback';

import OverallFeedback from './OverallFeedback';
import AssessmentActions from './AssessmentActions';

import useEditableAssessmentData from './useEditableAssessmentData';
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
    showValidation,
  } = useEditableAssessmentData();
  const { formatMessage } = useIntl();
  return (
    <Card className="assessment-card">
      <Card.Section className="assessment-body">
        <h3>{formatMessage(messages.rubric)}</h3>
        <hr className="m-2.5" />
        {criteria.map((criterion, criterionIndex) => {
          const { options, feedback } = formFields.criteria[criterionIndex];
          const args = {
            key: criterion.name,
            criterion,
            input: (
              <RadioCriterion
                criterion={criterion}
                formFields={{ ...options, isInvalid: options.isInvalid && showValidation }}
              />
            ),
            feedback: (
              <CriterionFeedback
                criterion={criterion}
                formFields={{ ...feedback, isInvalid: feedback.isInvalid && showValidation }}
              />
            ),
          };
          return (<CriterionContainer {...args} />);
        })}
        <hr />
        <OverallFeedback
          prompt={overallFeedbackPrompt}
          {...formFields.overallFeedback}
          isInvalid={showValidation && formFields.overallFeedback.isInvalid}
        />
      </Card.Section>
      <AssessmentActions {...{ onSubmit, submitStatus }} />
    </Card>
  );
};

EditableAssessment.propTypes = {
};

export default EditableAssessment;
