import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import {
  usePrompts,
  useSubmissionConfig,
  useSubmissionResponse,
} from 'data/services/lms/hooks/selectors';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

import messages from './messages';

const AssessmentContent = () => {
  const prompts = usePrompts();
  const response = useSubmissionResponse();
  const submissionConfig = useSubmissionConfig();
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
      {prompts.map((prompt, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <Prompt prompt={prompt} />
          <TextResponse
            submissionConfig={submissionConfig}
            value={response.textResponses[index]}
            isReadOnly
          />
        </div>
      ))}
      <FileUpload isReadOnly uploadedFiles={response.uploadedFiles} />
    </div>
  );
};

export default AssessmentContent;
