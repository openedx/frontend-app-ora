import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

import messages from './messages';

const SubmissionContent = ({
  submission,
  oraConfigData,
  onTextResponseChange,
  onFileUploaded,
  draftSaved,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">{formatMessage(messages.yourResponse)}</h2>
        {draftSaved && (
          <p className="d-flex text-primary">
            <Icon src={CheckCircle} />
            {formatMessage(messages.draftSaved)}
          </p>
        )}
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
};

SubmissionContent.propTypes = {
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
  onTextResponseChange: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
  draftSaved: PropTypes.bool.isRequired,
};

export default SubmissionContent;
