import React from 'react';
import { v4 as uuid } from 'uuid';

import {
  useIsORAConfigLoaded,
  usePrompts,
  useResponse,
} from 'hooks/app';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';

import BaseAssessmentView from '../BaseAssessmentView';

export const StudentTrainingView = () => {
  const prompts = usePrompts();
  const response = useResponse();
  if (!useIsORAConfigLoaded()) {
    return null;
  }
  const responseIsEmpty = !!response?.textResponses?.length;

  return (
    <BaseAssessmentView submitAssessment={() => {}}>
      <div>
        {React.Children.toArray(
          prompts.map((prompt, index) => (
            <div key={uuid()}>
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
export default StudentTrainingView;
