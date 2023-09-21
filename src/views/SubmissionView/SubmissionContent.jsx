import React from 'react';
import PropTypes from 'prop-types';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

const SubmissionContent = ({
  submission,
  oraConfigData,
  onTextResponseChange,
  onFileUploaded,
}) => (
  <div>
    <h2 className="mb-4">Your Response</h2>
    <p>
      <strong>Instructions: </strong>Create a response to the prompt below.
      Progress will be saved automatically and you can return to complete your
      progress at any time. After you submit your response, you cannot edit
      it.
    </p>
    {oraConfigData.prompts.map((prompt, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index}>
        <Prompt prompt={prompt} />
        <TextResponse
          submissionConfig={oraConfigData.submissionConfig}
          value={submission.response.textResponses[index]}
          onChange={(value) => onTextResponseChange(value, index)}
        />
      </div>
    ))}
    <FileUpload
      uploadedFiles={submission.response?.uploadedFiles}
      onFileUploaded={onFileUploaded}
    />
  </div>
);

SubmissionContent.propTypes = {
  submission: PropTypes.shape({
    response: PropTypes.shape({
      textResponses: PropTypes.arrayOf(PropTypes.string),
      uploadedFiles: PropTypes.arrayOf(PropTypes.shape({
        fileDescription: PropTypes.string,
        fileName: PropTypes.string,
        fileSize: PropTypes.number,
      })),
    }),
  }).isRequired,
  oraConfigData: PropTypes.shape({
    prompts: PropTypes.arrayOf(PropTypes.string),
    // eslint-disable-next-line react/forbid-prop-types
    submissionConfig: PropTypes.any,
  }).isRequired,
  onTextResponseChange: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
};

export default SubmissionContent;
