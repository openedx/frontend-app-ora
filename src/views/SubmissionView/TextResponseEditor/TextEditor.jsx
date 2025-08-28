import React from 'react';
import PropTypes from 'prop-types';

import { Form } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import './TextEditor.scss';

const TextEditor = ({
  // id,
  value,
  disabled,
  optional,
  onChange,
  isInValid,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Form.Group isInvalid={isInValid}>
      <Form.Control
        data-testid="custom-element"
        as="textarea"
        name="text-response"
        className="textarea-response"
        label={(
          <h3>
            {formatMessage(messages.yourResponse)} ({formatMessage(optional ? messages.optional : messages.required)})
          </h3>
        )}
        required={!optional}
        value={value}
        onChange={onChange}
        placeholder={formatMessage(messages.textResponsePlaceholder)}
        disabled={disabled}
      />
      { isInValid && <Form.Control.Feedback type="invalid">{formatMessage(messages.requiredField)}</Form.Control.Feedback>}
    </Form.Group>
  );
};

TextEditor.defaultProps = {
  disabled: false,
  value: '',
  optional: false,
  onChange: () => {},
  isInValid: false,
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
  isInValid: PropTypes.bool,
};

export default TextEditor;
