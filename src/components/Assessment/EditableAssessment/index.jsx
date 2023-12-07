import React from 'react';

import { Card } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  useCriteriaConfig,
  useOnSubmit,
} from 'hooks/assessment';

import CriterionContainer from 'components/CriterionContainer';
import RadioCriterion from 'components/CriterionContainer/RadioCriterion';
import CriterionFeedback from 'components/CriterionContainer/CriterionFeedback';

import OverallFeedback from './OverallFeedback';
import AssessmentActions from './AssessmentActions';

import messages from '../messages';

/**
 * <Rubric />
 */
const EditableAssessment = () => {
  const { formatMessage } = useIntl();

  const criteria = useCriteriaConfig();
  const { onSubmit, status: submitStatus } = useOnSubmit();

  const criteriaContainers = criteria.map(
    (criterion, criterionIndex) => (
      <CriterionContainer
        key={criterion.name}
        criterion={criterion}
        input={<RadioCriterion {...{ criterion, criterionIndex }} />}
        feedback={<CriterionFeedback {...{ criterion, criterionIndex }} />}
      />
    ),
  );

  return (
    <Card className="assessment-card">
      <Card.Section className="assessment-body">
        <h3>{formatMessage(messages.rubric)}</h3>
        <hr className="m-2.5" />
        {criteriaContainers}
        <hr />
        <OverallFeedback />
      </Card.Section>
      <AssessmentActions />
    </Card>
  );
};

EditableAssessment.propTypes = {
};

export default EditableAssessment;
