import React from 'react';

import {
  usePrompts,
  useResponseData,
} from 'data/services/lms/hooks/selectors';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';
import FilePreview from 'components/FilePreview';

const AssessmentContent = () => {
  const prompts = usePrompts();
  const response = useResponseData();
  return (
    <div>
      {React.Children.toArray(
        prompts.map((prompt, index) => (
          <div>
            <Prompt prompt={prompt} />
            <FilePreview />
            <TextResponse response={response.textResponses[index]} />
          </div>
        )),
      )}
      <FileUpload isReadOnly uploadedFiles={response.uploadedFiles} />
    </div>
  );
};

export default AssessmentContent;
