import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import {
  usePrompts,
  useSubmissionConfig,
  useStepState,
} from 'data/services/lms/hooks/selectors';
import { stepNames, stepStates } from 'data/services/lms/constants';

import FileUpload from 'components/FileUpload';
import FilePreview from 'components/FilePreview';
import Instructions from 'components/Instructions';
import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import TextResponseEditor from 'components/TextResponseEditor';
import StatusAlert from 'components/StatusAlert';

import messages from './messages';

const SubmissionContent = ({
  textResponses,
  uploadedFiles,
}) => {
  const submissionConfig = useSubmissionConfig();

  const stepState = useStepState({ step: stepNames.submission });
  const isReadOnly = stepState === stepStates.completed;
  const prompts = usePrompts();
  const { formatMessage } = useIntl();
  const createTextResponse = (index) => (isReadOnly
    ? <TextResponse response={textResponses.value[index]} />
    : (
      <TextResponseEditor
        submissionConfig={submissionConfig}
        value={textResponses.value[index]}
        onChange={textResponses.onChange(index)}
      />
    ));

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">{formatMessage(messages.yourResponse)}</h2>
        {(!isReadOnly && textResponses.draftSaved) && (
          <p className="d-flex text-primary">
            <Icon src={CheckCircle} />
            {formatMessage(messages.draftSaved)}
          </p>
        )}
      </div>

      <StatusAlert />
      <Instructions />

      {prompts.map((prompt, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <Prompt prompt={prompt} />
          {createTextResponse(index)}
        </div>
      ))}

      <FileUpload
        onDeletedFile={uploadedFiles.onDeletedFile}
        onFileUploaded={uploadedFiles.onFileUploaded}
        uploadedFiles={uploadedFiles.value}
        isReadOnly={isReadOnly}
      />
      {isReadOnly && <FilePreview />}
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
