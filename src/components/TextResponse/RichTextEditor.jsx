import React from 'react';
import PropTypes from 'prop-types';

import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce.min';
import 'tinymce/icons/default';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

export const stateKeys = StrictDict({
  value: 'value',
});

const RichTextEditor = ({
  // id,
  initialValue,
  disabled,
  optional,
}) => {
  const [value, setValue] = useKeyedState(stateKeys.value, initialValue);
  const { formatMessage } = useIntl();

  const extraConfig = disabled ? {
    toolbar: false,
    readonly: 1,
  } : {
    // eslint-disable-next-line max-len
    toolbar: 'formatselect | bold italic underline | link blockquote image | numlist bullist outdent indent | strikethrough | code | undo redo',
  };

  return (
    <div className="form-group">
      <label htmlFor="rich-text-editor">
        {formatMessage(messages.yourResponse)} ({formatMessage(optional ? messages.optional : messages.required)})
      </label>
      <Editor
        id="rich-text-editor"
        name="rich-text-response"
        initialValue={value}
        init={{
          menubar: false,
          statusbar: false,
          base_url: '/tinymce/js/tinymce/',
          theme: 'silver',
          skin: 'studio-tmce5',
          content_css: 'studio-tmce5',
          height: '300',
          schema: 'html5',
          plugins: 'code image link lists',
          ...extraConfig,
        }}
        onChange={(e) => setValue(e.target.getContent())}
        disabled={disabled}
      />
    </div>
  );
};

RichTextEditor.defaultProps = {
  disabled: false,
  initialValue: '',
  optional: false,
};

RichTextEditor.propTypes = {
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

export default RichTextEditor;
