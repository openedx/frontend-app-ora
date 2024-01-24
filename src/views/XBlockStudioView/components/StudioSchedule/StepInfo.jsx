import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import FormatDateTime from './FormatDateTime';

import messages from '../messages';

const StepInfo = ({ stepName, startDatetime, endDatetime }) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      {startDatetime && (
        <p>
          <strong>{stepName} {formatMessage(messages.startLabel)}</strong>
          <FormatDateTime date={startDatetime} />
        </p>
      )}
      {endDatetime && (
        <p>
          <strong>{stepName} {formatMessage(messages.dueLabel)}</strong>
          <FormatDateTime date={endDatetime} />
        </p>
      )}
    </div>
  );
};

StepInfo.defaultProps = {
  startDatetime: null,
  endDatetime: null,
};

StepInfo.propTypes = {
  stepName: PropTypes.string.isRequired,
  startDatetime: PropTypes.string,
  endDatetime: PropTypes.string,
};

export default StepInfo;
