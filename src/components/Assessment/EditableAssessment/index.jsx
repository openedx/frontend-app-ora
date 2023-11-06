import React from 'react';

import { Card } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useViewStep } from 'hooks';
import { stepNames } from 'data/services/lms/constants';

import CriterionContainer from 'components/CriterionContainer';
import RadioCriterion from 'components/CriterionContainer/RadioCriterion';
import CriterionFeedback from 'components/CriterionContainer/CriterionFeedback';
import { AssessmentContext } from 'context/AssessmentContext';

import OverallFeedback from './OverallFeedback';
import AssessmentActions from './AssessmentActions';

import messages from '../messages';

/**
 * <Rubric />
 */
const EditableAssessment = () => {
  const {
    criteria,
    onSubmit,
    submitStatus,
    overallFeedbackPrompt,
  } = React.useContext(AssessmentContext);
  const { formatMessage } = useIntl();
  const step = useViewStep();
  return (
    <Card className="assessment-card">
      <Card.Section className="assessment-body">
        <h3>{formatMessage(messages.rubric)}</h3>
        <hr className="m-2.5" />
        {criteria.map((criterion, criterionIndex) => {
          const args = {
            key: criterion.name,
            criterion,
            input: (<RadioCriterion {...{ criterion, criterionIndex }} />),
            feedback: (<CriterionFeedback {...{ criterion, criterionIndex }} />),
          };
          return (<CriterionContainer {...args} />);
        })}
        <hr />
        <OverallFeedback prompt={overallFeedbackPrompt} />
      </Card.Section>
      <AssessmentActions {...{ onSubmit, submitStatus }} />
    </Card>
  );
};

EditableAssessment.propTypes = {
};

export default EditableAssessment;
