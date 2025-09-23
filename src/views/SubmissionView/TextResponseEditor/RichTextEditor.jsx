import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@openedx/paragon';

import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce.min';
import 'tinymce/icons/default';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/themes/silver';

import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const RichTextEditor = ({
  value,
  disabled,
  optional,
  onChange,
  isInValid,
}) => {
  const { formatMessage } = useIntl();

  const extraConfig = disabled ? {
    toolbar: false,
    readonly: 1,
  } : {
    // eslint-disable-next-line max-len
    toolbar: 'formatselect | bold italic underline | link blockquote image | numlist bullist outdent indent | strikethrough | code | undo redo',
  };

  return (
    <div className="form-group ora-tinymce">
      <label htmlFor="rich-text-response h3">
        {formatMessage(messages.yourResponse)} ({formatMessage(optional ? messages.optional : messages.required)})
      </label>
      <Editor
        className="bg-white"
        name="rich-text-response"
        value={value}
        init={{
          menubar: false,
          statusbar: false,
          // TODO: rewrite this to use skin=false and content_css=false when we figure
          //       which part of css-loader to change to stop tinymce from changing the
          //       oxide skin css.
          base_url: `${process.env.LMS_BASE_URL}/static/js/vendor/tinymce/js/tinymce`,
          skin: 'studio-tmce5',
          content_css: 'studio-tmce5',
          height: '300',
          schema: 'html5',
          plugins: 'code image link lists',
          ...extraConfig,
        }}
        onEditorChange={onChange}
        disabled={disabled}
      />
      { isInValid && <Form.Control.Feedback type="invalid">{formatMessage(messages.requiredField)}</Form.Control.Feedback>}
    </div>
  );
};

RichTextEditor.defaultProps = {
  disabled: false,
  value: '',
  optional: false,
  onChange: () => { },
  isInValid: false,
};

RichTextEditor.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  optional: PropTypes.bool,
  onChange: PropTypes.func,
  isInValid: PropTypes.bool,
};

export default RichTextEditor;
