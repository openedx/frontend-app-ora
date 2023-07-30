import React from 'react';

import { useORAConfigData } from 'data/services/lms/hooks/selectors';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse/Editor';
import FileUpload from 'components/FileUpload';

const SubmissionContent = () => {
  const { prompts } = useORAConfigData();
  return (
    <div>
      {React.Children.toArray(
        prompts.map((prompt, index) => (
          <div>
            <Prompt promptIndex={index} />
            <TextResponse promptIndex={index} />
          </div>
        )),
      )}
      <FileUpload />
    </div>
  );
};

export default SubmissionContent;
