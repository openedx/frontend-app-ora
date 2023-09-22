import React from 'react';
import PropTypes from 'prop-types';

import TextEditor from 'components/TextResponse/TextEditor';
import RichTextEditor from 'components/TextResponse/RichTextEditor';

import './index.scss';

const TextResponse = ({ submissionConfig, value, onChange }) => {
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

TextResponse.propTypes = {
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

export default TextResponse;
