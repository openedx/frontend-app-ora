import React from 'react';
import PropTypes from 'prop-types';

import { useSubmissionConfig } from 'hooks/app';

import './index.scss';

const TextResponse = ({ response }) => {
  const { textResponseConfig } = useSubmissionConfig();

  return (
    <div className="my-2 p-2 bg-white">
      {textResponseConfig.editorType === 'text' ? (
        <pre className="pre-like-textarea p-1">{response}</pre>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: response }} />
      )}
    </div>
  );
};

TextResponse.propTypes = {
  response: PropTypes.string.isRequired,
};

export default TextResponse;
