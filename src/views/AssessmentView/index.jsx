import React from 'react';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

import BaseAssessmentView from './BaseAssessmentView';
import useAssessmentData from './useAssessmentData';

export const AssessmentView = () => {
  const { prompts, response, isLoaded } = useAssessmentData();
  if (!isLoaded) {
    return null;
  }

  const responseIsEmpty = !!response?.textResponses?.length;

  return (
    <BaseAssessmentView submitAssessment={() => {}}>
      <div>
        {React.Children.toArray(
          prompts.map((prompt, index) => (
            <div>
              <Prompt prompt={prompt} />
              {responseIsEmpty && <TextResponse response={response.textResponses[index]} />}
            </div>
          )),
        )}
        {responseIsEmpty && <FileUpload isReadOnly uploadedFiles={response.uploadedFiles} />}
      </div>
    </BaseAssessmentView>
  );
};

export default AssessmentView;
