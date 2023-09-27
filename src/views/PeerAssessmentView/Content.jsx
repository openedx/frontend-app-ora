import React from 'react';

import {
  useORAConfigData,
  useSubmissionResponse,
} from 'data/services/lms/hooks/selectors';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

const AssessmentContent = () => {
  const { prompts } = useORAConfigData();
  const response = useSubmissionResponse();
  return (
    <div>
      {React.Children.toArray(
        prompts.map((prompt, index) => (
          <div>
            <Prompt prompt={prompt} />
            <TextResponse response={response.textResponses[index]} />
          </div>
        )),
      )}
      <FileUpload isReadOnly />
    </div>
  );
};

export default AssessmentContent;
