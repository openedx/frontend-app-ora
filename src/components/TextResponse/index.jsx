import React from 'react';
import PropTypes from 'prop-types';

import {
  useSubmissionConfig,
  // useSubmissionResponse,
  // useSubmissionStatus,
  // useSubmissionTeamInfo,
} from 'data/services/lms/hooks/selectors';

import TextEditor from 'components/TextResponse/TextEditor';
import RichTextEditor from 'components/TextResponse/RichTextEditor';

import './index.scss';

export const TextResponse = () => {
  const { textResponseConfig } = useSubmissionConfig();
  const { optional, enabled } = textResponseConfig;
  const props = {
    optional,
    disabled: !enabled,
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
  promptIndex: PropTypes.number.isRequired,
};

export default TextResponse;
