import React from 'react';
import PropTypes from 'prop-types';

import TextEditor from 'components/TextResponseEditor/TextEditor';
import RichTextEditor from 'components/TextResponseEditor/RichTextEditor';

import './index.scss';

const TextResponseEditor = ({ submissionConfig, value, onChange }) => {
  const { textResponseConfig } = submissionConfig;
  const { optional, enabled } = textResponseConfig;
  const props = {
    optional,
    disabled: !enabled,
    value,
    onChange,
  };

  return (
    <div className="mt-2">
      {
        textResponseConfig?.editorType === 'text' ? <TextEditor {...props} /> : <RichTextEditor {...props} />
      }
    </div>
  );
};

TextResponseEditor.propTypes = {
  submissionConfig: PropTypes.shape({
    textResponseConfig: PropTypes.shape({
      optional: PropTypes.bool,
      enabled: PropTypes.bool,
      editorType: PropTypes.string,
    }),
  }).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextResponseEditor;
