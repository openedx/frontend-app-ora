import React from 'react';
import PropTypes from 'prop-types';

import { TextArea } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const TextEditor = ({
  // id,
  value,
  disabled,
  optional,
  onChange,
}) => {
  const { formatMessage } = useIntl();

  return (
    <TextArea
      name="text-response"
      className="textarea-response"
      label={`
        ${formatMessage(messages.yourResponse)} (${formatMessage(optional ? messages.optional : messages.required)})
      `}
      value={value}
      onChange={onChange}
      placeholder={formatMessage(messages.textResponsePlaceholder)}
      disabled={disabled}
    />
  );
};

TextEditor.defaultProps = {
  disabled: false,
  value: '',
  optional: false,
  onChange: () => { },
};

TextEditor.propTypes = {
  // id: PropTypes.string.isRequired,
  // input: PropTypes.shape({
  //   value: PropTypes.string,
  //   name: PropTypes.string,
  //   onChange: PropTypes.func.isRequired,
  // }).isRequired,
  // meta: PropTypes.shape({
  //   touched: PropTypes.bool,
  //   submitFailed: PropTypes.bool,
  //   error: PropTypes.string,
  // }).isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  optional: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TextEditor;
