import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextArea } from '@edx/paragon';
import { StrictDict } from '@edx/react-unit-test-utils';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

export const stateKeys = StrictDict({
  value: 'value',
});

const TextEditor = ({
  // id,
  initialValue,
  disabled,
  optional,
}) => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useState(initialValue);

  return (
    <TextArea
      name="text-response"
      className="textarea-response"
      label={`
        ${formatMessage(messages.yourResponse)} (${formatMessage(optional ? messages.optional : messages.required)})
      `}
      value={value}
      onChange={setValue}
      placeholder={formatMessage(messages.textResponsePlaceholder)}
      disabled={disabled}
    />
  );
};

TextEditor.defaultProps = {
  disabled: false,
  initialValue: '',
  optional: false,
};

TextEditor.propTypes = {
  // id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool,
  initialValue: PropTypes.string,
  optional: PropTypes.bool,
};

export default TextEditor;
