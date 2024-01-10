import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSubmissionConfig } from 'hooks/app';

import './index.scss';

const TextResponse = ({ response }) => {
  const { textResponseConfig } = useSubmissionConfig();
  const textResponseRef = React.useRef(null);

  useEffect(() => {
    if (textResponseConfig.allowLatexPreview) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, textResponseRef.current]);
    }
  }, [response]);

  return (
    <div ref={textResponseRef} className="my-2 p-2 bg-white">
      {textResponseConfig.editorType === 'text' ? (
        <div className="div-textarea p-1" dangerouslySetInnerHTML={{ __html: response }} />
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
