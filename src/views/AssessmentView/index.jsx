import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import FileUpload from 'components/FileUpload';
import { useViewStep } from 'hooks/routing';

import BaseAssessmentView from './BaseAssessmentView';
import useAssessmentData from './useAssessmentData';
import messages from './messages';

export const AssessmentView = () => {
  const { prompts, response, isLoaded } = useAssessmentData();
  const { formatMessage } = useIntl();
  const step = useViewStep();
  if (!isLoaded) {
    return null;
  }

  const responseIsEmpty = !response?.textResponses?.length;

  return (
    <BaseAssessmentView submitAssessment={() => {}}>
      <div>
        {React.Children.toArray(
          prompts.map((prompt, index) => (
            <div>
              <Prompt prompt={prompt} />
              {!responseIsEmpty && (
                <>
                  <h3 className="m-1">{formatMessage(messages.responseMessages[step])}</h3>
                  <TextResponse response={response.textResponses[index]} />
                </>
              )}
            </div>
          )),
        )}
        {!responseIsEmpty && <FileUpload isReadOnly uploadedFiles={response.uploadedFiles} />}
      </div>
    </BaseAssessmentView>
  );
};

export default AssessmentView;
