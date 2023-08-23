import React from 'react';

import { useORAConfigData } from 'data/services/lms/hooks/selectors';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

const SubmissionContent = () => {
  const { prompts } = useORAConfigData();
  return (
    <div>
      {
        prompts.map((prompt, index) => (
          <div>
            <Prompt promptIndex={index} />
            <TextResponse promptIndex={index} />
          </div>
        ))
      }
      <FileUpload />
    </div>
  );
};

export default SubmissionContent;
