import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const CollapsibleFeedback = ({ children, stepScore, stepLabel }) => {
  const { formatMessage } = useIntl();

  return (
    <Collapsible
      title={
        <h3>
          {formatMessage(messages.grade, { stepLabel })}
          {stepScore && formatMessage(messages.gradePoints, stepScore)}
        </h3>
      }
    >
      {children}
    </Collapsible>
  );
};
CollapsibleFeedback.defaultProps = {};
CollapsibleFeedback.propTypes = {
  stepLabel: PropTypes.string.isRequired,
  stepScore: PropTypes.shape({
    earned: PropTypes.number,
    possible: PropTypes.number,
  }),
  children: PropTypes.node.isRequired,
};

export default CollapsibleFeedback;
