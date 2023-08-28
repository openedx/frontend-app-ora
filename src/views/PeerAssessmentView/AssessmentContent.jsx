import React from 'react';

import { useORAConfigData } from 'data/services/lms/hooks/selectors';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

const AssessmentContent = () => {
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
      <FileUpload isReadOnly />
    </div>
  );
};

export default AssessmentContent;
