import React from 'react';

import { Card } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useRubricConfig } from 'data/services/lms/hooks/selectors';
import CriterionContainer from 'components/CriterionContainer';
import ReviewCriterion from 'components/CriterionContainer/ReviewCriterion';

import messages from './messages';

import './Rubric.scss';

/**
 * <Rubric />
 */
export const Rubric = () => {
  const { criteria } = useRubricConfig();
  const { formatMessage } = useIntl();
  return (
    <Card className="rubric-card">
      <Card.Section className="rubric-body">
        <h3>{formatMessage(messages.rubric)}</h3>
        <hr className="m-2.5" />
        {criteria.map((criterion) => (
          <CriterionContainer
            key={criterion.name}
            criterion={criterion}
            input={<ReviewCriterion criterion={criterion} />}
          />
        ))}
      </Card.Section>
    </Card>
  );
};

Rubric.propTypes = {
};

export default Rubric;
