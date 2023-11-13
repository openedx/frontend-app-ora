import React from 'react';
import PropTypes from 'prop-types';

import {
  usePrompts,
  useSubmissionConfig,
} from 'hooks/app';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import TextResponseEditor from './TextResponseEditor';

const SubmissionPrompts = ({
  textResponses,
  onUpdateTextResponse,
  isReadOnly,
}) => {
  const submissionConfig = useSubmissionConfig();

  const response = (index) => {
    if (!submissionConfig.textResponseConfig.enabled) {
      return null;
    }
    return isReadOnly
      ? <TextResponse response={textResponses[index]} />
      : (
        <TextResponseEditor
          value={textResponses[index]}
          onChange={onUpdateTextResponse(index)}
        />
      );
  };

  return usePrompts().map((prompt, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}>
      <Prompt prompt={prompt} />
      {response(index)}
    </div>
  ));
};
SubmissionPrompts.defaultProps = {
  textResponses: null,
};
SubmissionPrompts.propTypes = {
  textResponses: PropTypes.arrayOf(PropTypes.string),
  onUpdateTextResponse: PropTypes.func.isRequired,
};

export default SubmissionPrompts;
