import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { usePrompts, useSubmissionConfig } from 'data/services/lms/hooks/selectors';

import Prompt from 'components/Prompt';
import TextResponseEditor from 'components/TextResponseEditor';
import FileUpload from 'components/FileUpload';

import messages from './messages';

const SubmissionContent = ({
  textResponses,
  uploadedFiles,
}) => {
  const submissionConfig = useSubmissionConfig();
  const prompts = usePrompts();
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">{formatMessage(messages.yourResponse)}</h2>
        {textResponses.draftSaved && (
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
      {prompts.map((prompt, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <Prompt prompt={prompt} />
          <TextResponseEditor
            submissionConfig={submissionConfig}
            value={textResponses.value[index]}
            onChange={textResponses.onChange(index)}
          />
        </div>
      ))}
      <FileUpload
        onDeletedFile={uploadedFiles.onDeletedFile}
        onFileUploaded={uploadedFiles.onFileUploaded}
        uploadedFiles={uploadedFiles.value}
      />
    </div>
  );
};

SubmissionContent.propTypes = {
  textResponses: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    draftSaved: PropTypes.bool.isRequired,
  }).isRequired,
  uploadedFiles: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.shape({
      fileDescription: PropTypes.string,
      fileName: PropTypes.string,
      fileSize: PropTypes.number,
    })),
    onDeletedFile: PropTypes.func.isRequired,
    onFileUploaded: PropTypes.func.isRequired,
  }).isRequired,
};

export default SubmissionContent;
