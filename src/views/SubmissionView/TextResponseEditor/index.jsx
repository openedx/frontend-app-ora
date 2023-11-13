import React from 'react';
import PropTypes from 'prop-types';

import { useSubmissionConfig } from 'hooks/app';

import TextEditor from './TextEditor';
import RichTextEditor from './RichTextEditor';

import './index.scss';

const TextResponseEditor = ({ value, onChange }) => {
  const { textResponseConfig } = useSubmissionConfig();
  const {
    optional,
    enabled,
    editorType,
  } = textResponseConfig || {};

  if (!enabled) {
    return null;
  }

  const EditorComponent = editorType === 'text' ? TextEditor : RichTextEditor;

  return (
    <div className="mt-2">
      <EditorComponent {...{ optional, value, onChange }} />
    </div>
  );
};

TextResponseEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextResponseEditor;
