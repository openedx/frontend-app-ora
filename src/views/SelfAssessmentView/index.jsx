import React from 'react';

import { Button } from '@edx/paragon';
import {
  useIsORAConfigLoaded,
  usePrompts,
  useResponseData,
} from 'data/services/lms/hooks/selectors';
import { stepNames } from 'data/services/lms/constants';

import FileUpload from 'components/FileUpload';
import ModalActions from 'components/ModalActions';
import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';

import StatusAlert from 'components/StatusAlert';
import BaseAssessmentView from 'components/BaseAssessmentView';

export const SelfAssessmentView = () => {
  const prompts = usePrompts();
  const response = useResponseData();
  if (!useIsORAConfigLoaded()) {
    return null;
  }
  return (
    <BaseAssessmentView submitAssessment={() => {}}>
      <StatusAlert />
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
        <ModalActions step={stepNames.peer} />
      </div>
    </BaseAssessmentView>
  );
};

export default SelfAssessmentView;
