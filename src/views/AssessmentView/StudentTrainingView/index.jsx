import React from 'react';

import {
  useIsORAConfigLoaded,
  usePrompts,
  useResponse,
} from 'hooks/app';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';
import ModalActions from 'components/ModalActions';

import BaseAssessmentView from '../BaseAssessmentView';

export const StudentTrainingView = () => {
  const prompts = usePrompts();
  const response = useResponse();
  console.log("StudentTrainingView");
  if (!useIsORAConfigLoaded()) {
    return null;
  }
  return (
    <BaseAssessmentView submitAssessment={() => {}}>
      <div>
        {React.Children.toArray(
          prompts.map((prompt, index) => (
            <div>
              <Prompt prompt={prompt} />
              <TextResponse response={response.textResponses[index]} />
            </div>
          )),
        )}
        <FileUpload isReadOnly uploadedFiles={response.uploadedFiles} />
      </div>
    </BaseAssessmentView>
  );
};
export default StudentTrainingView;
