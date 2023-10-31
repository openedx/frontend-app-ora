import React from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const CollapsibleAssessment = ({
  children,
  stepScore,
  stepLabel,
  defaultOpen,
}) => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = () => setOpen(!open);

  return (
    <Collapsible
      title={(
        <h3>
          {formatMessage(
            stepScore ? messages.grade : messages.unweightedGrade,
            { stepLabel },
          )}
          {stepScore && formatMessage(messages.gradePoints, stepScore)}
        </h3>
      )}
      open={open}
      onToggle={toggle}
    >
      {children}
    </Collapsible>
  );
};
CollapsibleAssessment.defaultProps = {
  defaultOpen: false,
};
CollapsibleAssessment.propTypes = {
  stepLabel: PropTypes.string.isRequired,
  stepScore: PropTypes.shape({
    earned: PropTypes.number,
    possible: PropTypes.number,
  }).isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
};

export default CollapsibleAssessment;
