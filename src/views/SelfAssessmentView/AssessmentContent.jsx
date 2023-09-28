import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

import messages from './messages';

const AssessmentContent = ({
  submission,
  oraConfigData,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">{formatMessage(messages.yourResponse)}</h2>
      </div>
      <p>
        <strong>{formatMessage(messages.instructions)}: </strong>
        {formatMessage(messages.instructionsText)}
      </p>
      {oraConfigData.prompts.map((prompt, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <Prompt prompt={prompt} />
          <TextResponse
            submissionConfig={oraConfigData.submissionConfig}
            value={submission.response.textResponses[index]}
            isReadOnly
          />
        </div>
      ))}
      <FileUpload
        uploadedFiles={submission.response?.uploadedFiles}
        isReadOnly
      />
    </div>
  );
};

AssessmentContent.propTypes = {
  submission: PropTypes.shape({
    response: PropTypes.shape({
      textResponses: PropTypes.arrayOf(PropTypes.string),
      uploadedFiles: PropTypes.arrayOf(
        PropTypes.shape({
          fileDescription: PropTypes.string,
          fileName: PropTypes.string,
          fileSize: PropTypes.number,
        }),
      ),
    }),
  }).isRequired,
  oraConfigData: PropTypes.shape({
    prompts: PropTypes.arrayOf(PropTypes.string),
    // eslint-disable-next-line react/forbid-prop-types
    submissionConfig: PropTypes.any,
  }).isRequired,
};

export default AssessmentContent;
