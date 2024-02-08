import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';

const FormatDateTime = ({ date }) => {
  const { formatMessage, formatDate } = useIntl();
  return (
    <span>{date ? formatDate(date, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }) : formatMessage(messages.notSetLabel)}
    </span>
  );
};

FormatDateTime.defaultProps = {
  date: null,
};
FormatDateTime.propTypes = {
  date: PropTypes.string,
};

export default FormatDateTime;
