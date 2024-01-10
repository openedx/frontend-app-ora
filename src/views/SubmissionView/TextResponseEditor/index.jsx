import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useSubmissionConfig } from 'hooks/app';

import TextEditor from './TextEditor';
import RichTextEditor from './RichTextEditor';
import LatexPreview from './LaTexPreview';
import messages from './messages';

const TextResponseEditor = ({ value, onChange }) => {
  const { textResponseConfig } = useSubmissionConfig();
  const {
    optional,
    enabled,
    editorType,
    allowLatexPreview,
  } = textResponseConfig || {};
  const { formatMessage } = useIntl();

  const [latexValue, setLatexValue] = React.useState('');
  
  const previewLaTex = useCallback(() => {
    setLatexValue(value);
  }, [value]);

  if (!enabled) {
    return null;
  }

  const EditorComponent = editorType === 'text' ? TextEditor : RichTextEditor;

  return (
    <div className="mt-2">
      <EditorComponent {...{ optional, value, onChange }} />
      {
        allowLatexPreview && (
          <div>
            <Button className="btn btn-primary btn-sm mt-2" onClick={previewLaTex}>{formatMessage(messages.previewLaTexButton)}</Button>
            <LatexPreview latexValue={latexValue} />
          </div>
        )
      }
    </div>
  );
};

TextResponseEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextResponseEditor;
