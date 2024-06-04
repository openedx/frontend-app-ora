import React from 'react';
import PropTypes from 'prop-types';

import { Card, Collapsible } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useRubricConfig } from 'data/services/lms/hooks/selectors';
import CriterionContainer from 'components/CriterionContainer';
import ReviewCriterion from 'components/CriterionContainer/ReviewCriterion';

import messages from './messages';

import './Rubric.scss';

/**
 * <Rubric />
 */
export const Rubric = ({ isCollapsible }) => {
  const { criteria } = useRubricConfig();
  const { formatMessage } = useIntl();

  const Layout = isCollapsible ? Collapsible : Card;
  return (
    <Layout
      title={<h3>{formatMessage(messages.header)}</h3>}
      className="rubric-card my-3"
    >
      <Card.Section className="rubric-body">
        {!isCollapsible && (
          <>
            <h3>{formatMessage(messages.rubric)}</h3>
            <hr className="m-2.5" />
          </>
        )}
        {criteria.map((criterion) => (
          <CriterionContainer
            key={criterion.name}
            criterion={criterion}
            input={<ReviewCriterion criterion={criterion} />}
          />
        ))}
      </Card.Section>
    </Layout>
  );
};
Rubric.defaultProps = {
  isCollapsible: false,
};
Rubric.propTypes = {
  isCollapsible: PropTypes.bool,
};

export default Rubric;
